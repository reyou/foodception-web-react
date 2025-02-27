# Script to kill processes using port 3000
# Useful for when React development server doesn't shut down properly

Write-Host "Searching for processes using port 3000..."

# Find the process ID using the port 3000
$processInfo = netstat -ano | Select-String ":3000 " | Select-String "LISTENING"

if ($processInfo) {
    # Extract the PID from the netstat output
    $processId = ($processInfo -split '\s+')[-1]
    
    # Get process details
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    
    if ($process) {
        Write-Host "Found process using port 3000:"
        Write-Host "Process Name: $($process.ProcessName)"
        Write-Host "Process ID: $processId"
        
        # Kill the process
        Write-Host "Attempting to kill process..."
        Stop-Process -Id $processId -Force
        
        # Verify the process was killed
        $verifyProcess = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if (-not $verifyProcess) {
            Write-Host "Process successfully terminated." -ForegroundColor Green
        }
        else {
            Write-Host "Failed to terminate process. You may need to run this script as administrator." -ForegroundColor Red
        }
    }
    else {
        Write-Host "Process with ID $processId not found." -ForegroundColor Yellow
    } 
}
else {
    Write-Host "No process found using port 3000." -ForegroundColor Yellow
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")