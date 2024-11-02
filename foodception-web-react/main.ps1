# Define the main function
function main {
    Set-Location -Path $PSScriptRoot

    Clear-Host
    Write-Host "Welcome to Foodception Web React"
    Write-Host "Today is $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

    # Display the current directory
    Write-Host "Current Directory: $(Get-Location)"

    # Check if a parameter was passed
    if ($args.Count -eq 0) {
        Write-Host "No options passed."
        return
    }

    # Check if the parameter matches any function
    switch ($args[0]) {
        "test" { test }
        "build" { build }
        "deploy" { deploy }
        Default { Write-Host "Invalid option: $($args[0])" }
    }
}


# Define the test function
function test {
    Write-Host "Running tests..."
    # Add your test commands here
}


function build {
    Write-Host "Building the project..."

    # Start the timer
    $startTime = Get-Date

    # Run the build command
    npm run build

    # Calculate elapsed time
    $endTime = Get-Date
    $elapsedTime = $endTime - $startTime

    Write-Host "Build completed in $($elapsedTime.TotalSeconds) seconds."
}

function deploy {
    Write-Host "Deploying the project..."

    # Start the timer
    $startTime = Get-Date

    npm run deploy

    # Calculate elapsed time
    $endTime = Get-Date
    $elapsedTime = $endTime - $startTime

    Write-Host "Deploy command completed in $($elapsedTime.TotalSeconds) seconds."

    Open-URL "https://github.com/reyou/foodception-web-react/actions"
}

function Open-URL {
    param (
        [Parameter(Mandatory = $true)]
        [string]$url
    )

    # Use Start-Process to open the URL in the default browser
    Start-Process $url
}


# Call the main function with parameters
main @args
