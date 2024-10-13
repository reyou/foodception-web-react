# Set the directory to scan (use the current directory by default)
$directory = Get-Location

# Define ignore patterns (you can add more as needed)
$ignorePatterns = @(
    "*node_modules*",
    "*src\App.test.tsx",
    "*src\__tests__*",  
    "*setupTests.ts"
    "*src\App.tsx"
    "*src\index.tsx"
    "*src\Layout.tsx"
    "*src\Router.tsx"
)

# Function to check if a file should be ignored
function ShouldIgnoreFile($filePath) {
    foreach ($pattern in $ignorePatterns) {
        if ($filePath -like $pattern) {
            return $true  # File matches an ignore pattern
        }
    }
    return $false  # File doesn't match any ignore pattern
}

Clear-Host
Write-Host "Scanning $directory..."

# Find all .tsx files recursively
$tsxFiles = Get-ChildItem -Path $directory -Recurse -Filter *.tsx

# Initialize an array to store files that don't contain 'react-bootstrap' import
$missingBootstrapFiles = @()

# Loop through each .tsx file
foreach ($file in $tsxFiles) {
    # Check if the file should be ignored
    if (ShouldIgnoreFile $file.FullName) {
        continue  # Skip this file
    }

    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw

    # Check if the file contains 'react-bootstrap' import
    if ($content -notmatch "import .*react-bootstrap") {
        # If not found, add the file to the list
        $missingBootstrapFiles += $file.FullName
    }
}

# Display the results
if ($missingBootstrapFiles.Count -eq 0) {
    Write-Host "✅ All .tsx files contain react-bootstrap import."
}
else {
    Write-Host "❌ Files missing react-bootstrap import:"
    $missingBootstrapFiles | ForEach-Object { Write-Host $_ }
}
