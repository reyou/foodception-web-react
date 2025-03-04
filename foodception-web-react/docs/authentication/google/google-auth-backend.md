# Google OAuth Backend Implementation

This document outlines the backend implementation for Google OAuth authentication in the Foodception application.

## API Endpoint

Create an endpoint to handle the Google OAuth callback:

```csharp
// Request Model
public class GoogleLoginRequest
{
    [Required]
    public string Code { get; set; }
}

// Response Model
public class GoogleLoginResponse
{
    public string AccessToken { get; set; }
    public string TokenType { get; set; }
    public DateTime ExpiresAt { get; set; }
    public UserDto User { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public AuthenticationController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        IUserRepository userRepository,
        ILogger<AuthenticationController> logger,
        IJwtTokenGenerator tokenGenerator)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _userRepository = userRepository;
        _logger = logger;
        _tokenGenerator = tokenGenerator;
    }

    [HttpPost("authentication/login/google")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
    {
        try
        {
            // 1. Validate request
            if (string.IsNullOrEmpty(request.Code))
            {
                return BadRequest(new { error = "Authorization code is required" });
            }

            // 2. Exchange code for tokens
            var httpClient = _httpClientFactory.CreateClient();
            var tokenResponse = await httpClient.PostAsync(
                "https://oauth2.googleapis.com/token",
                new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    ["code"] = request.Code,
                    ["client_id"] = _configuration["Google:ClientId"],
                    ["client_secret"] = _configuration["Google:ClientSecret"],
                    ["redirect_uri"] = _configuration["Google:RedirectUri"],
                    ["grant_type"] = "authorization_code"
                })
            );

            if (!tokenResponse.IsSuccessStatusCode)
            {
                _logger.LogError("Google token exchange failed: {Error}", 
                    await tokenResponse.Content.ReadAsStringAsync());
                return StatusCode(500, new { error = "Failed to exchange Google token" });
            }

            var tokenResult = await tokenResponse.Content.ReadFromJsonAsync<GoogleTokenResponse>();

            // 3. Get user information
            var userInfoResponse = await httpClient.GetAsync(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                new AuthenticationHeaderValue("Bearer", tokenResult.AccessToken)
            );

            if (!userInfoResponse.IsSuccessStatusCode)
            {
                _logger.LogError("Failed to get Google user info");
                return StatusCode(500, new { error = "Failed to get user information" });
            }

            var googleUser = await userInfoResponse.Content.ReadFromJsonAsync<GoogleUserInfo>();

            // 4. Find or create user
            var user = await _userRepository.FindByEmail(googleUser.Email);
            if (user == null)
            {
                user = new User
                {
                    Email = googleUser.Email,
                    Name = googleUser.Name,
                    GoogleId = googleUser.Sub,
                    EmailVerified = googleUser.EmailVerified,
                    ProfilePictureUrl = googleUser.Picture,
                    CreatedAt = DateTime.UtcNow
                };
                await _userRepository.Create(user);
            }
            else
            {
                user.GoogleId = googleUser.Sub;
                user.LastLogin = DateTime.UtcNow;
                user.ProfilePictureUrl = googleUser.Picture;
                await _userRepository.Update(user);
            }

            // 5. Generate JWT token
            var (accessToken, expiresAt) = _tokenGenerator.GenerateToken(user);

            // 6. Return response
            return Ok(new GoogleLoginResponse
            {
                AccessToken = accessToken,
                TokenType = "Bearer",
                ExpiresAt = expiresAt,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    ProfilePictureUrl = user.ProfilePictureUrl
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Google login");
            return StatusCode(500, new { error = "An unexpected error occurred" });
        }
    }
}

// Supporting Models
public class GoogleTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }

    [JsonPropertyName("id_token")]
    public string IdToken { get; set; }

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }

    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }
}

public class GoogleUserInfo
{
    [JsonPropertyName("sub")]
    public string Sub { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("email_verified")]
    public bool EmailVerified { get; set; }

    [JsonPropertyName("picture")]
    public string Picture { get; set; }
}

public class UserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string ProfilePictureUrl { get; set; }
}
```

Example successful response:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresAt": "2025-03-03T00:10:10Z",
    "user": {
        "id": "123",
        "email": "user@example.com",
        "name": "John Doe",
        "profilePictureUrl": "https://..."
    }
}
```

Example error response:
```json
{
    "error": "Failed to exchange Google token"
}
```

## Token Exchange Flow

1. **Receive Authorization Code**
   - Frontend sends the authorization code to `/authentication/login/google`
   - Validate the code is present and not expired

2. **Exchange Code for Tokens**
   ```csharp
   var tokenResponse = await httpClient.PostAsync(
       "https://oauth2.googleapis.com/token",
       new FormUrlEncodedContent(new Dictionary<string, string>
       {
           ["code"] = authorizationCode,
           ["client_id"] = GOOGLE_CLIENT_ID,
           ["client_secret"] = GOOGLE_CLIENT_SECRET,
           ["redirect_uri"] = REDIRECT_URI,
           ["grant_type"] = "authorization_code"
       })
   );
   ```

3. **Parse Token Response**
   The response will include:
   ```json
   {
       "access_token": "...",
       "refresh_token": "...",
       "id_token": "...",
       "token_type": "Bearer",
       "expires_in": 3600
   }
   ```

4. **Get User Information**
   ```csharp
   var userInfoResponse = await httpClient.GetAsync(
       "https://www.googleapis.com/oauth2/v3/userinfo",
       new AuthenticationHeaderValue("Bearer", accessToken)
   );
   ```

   Response contains:
   ```json
   {
       "sub": "Google User ID",
       "name": "User's Full Name",
       "given_name": "First Name",
       "family_name": "Last Name",
       "picture": "Profile Picture URL",
       "email": "user@example.com",
       "email_verified": true
   }
   ```

## User Management

1. **Check Existing User**
   ```csharp
   var existingUser = await _userRepository.FindByEmail(userInfo.Email);
   ```

2. **Create or Update User**
   ```csharp
   if (existingUser == null)
   {
       // Create new user
       user = new User
       {
           Email = userInfo.Email,
           Name = userInfo.Name,
           GoogleId = userInfo.Sub,
           // ... other fields
       };
   }
   else
   {
       // Update existing user
       existingUser.GoogleId = userInfo.Sub;
       existingUser.LastLogin = DateTime.UtcNow;
       // ... update other fields
   }
   ```

3. **Store Tokens**
   ```csharp
   await _tokenRepository.StoreTokens(
       userId,
       accessToken,
       refreshToken,
       DateTime.UtcNow.AddSeconds(expiresIn)
   );
   ```

## Error Handling

1. **Invalid Code**
   ```csharp
   if (string.IsNullOrEmpty(code))
   {
       return BadRequest(new { error = "Authorization code is required" });
   }
   ```

2. **Token Exchange Errors**
   ```csharp
   if (!tokenResponse.IsSuccessStatusCode)
   {
       var error = await tokenResponse.Content.ReadAsStringAsync();
       _logger.LogError($"Google token exchange failed: {error}");
       return StatusCode(500, new { error = "Failed to exchange Google token" });
   }
   ```

3. **User Info Errors**
   ```csharp
   if (!userInfoResponse.IsSuccessStatusCode)
   {
       _logger.LogError("Failed to get Google user info");
       return StatusCode(500, new { error = "Failed to get user information" });
   }
   ```

## Security Considerations

1. **Token Storage**
   - Store refresh tokens securely (encrypted)
   - Never expose tokens to the frontend
   - Implement token rotation

2. **User Verification**
   - Verify email is confirmed (`email_verified: true`)
   - Validate token signatures
   - Check for token expiration

3. **Rate Limiting**
   - Implement rate limiting on the callback endpoint
   - Monitor for suspicious activity

## Environment Configuration

Required environment variables:
```plaintext
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://your-domain.com/user/oauth-callback/google
```

## Testing

1. **Mock Responses**
   ```csharp
   public class GoogleAuthTests
   {
       [Fact]
       public async Task ValidCode_ReturnsUserData()
       {
           // Arrange
           var mockHttp = new MockHttpMessageHandler();
           mockHttp.When("https://oauth2.googleapis.com/token")
                  .Respond("application/json", "{ ... }");

           // Act
           var result = await controller.GoogleLogin(new { code = "valid_code" });

           // Assert
           Assert.IsType<OkObjectResult>(result);
       }
   }
   ```

2. **Error Cases**
   - Test invalid codes
   - Test expired tokens
   - Test network failures
   - Test user creation/update scenarios

## Logging

Important events to log:
1. Token exchange attempts
2. User creation/updates
3. Authentication failures
4. Token refresh attempts

```csharp
_logger.LogInformation("Google login attempt for user {Email}", userInfo.Email);
_logger.LogWarning("Failed Google login attempt: {Error}", error);
```

## Related Documentation
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In Best Practices](https://developers.google.com/identity/sign-in/web/sign-in)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-15)