param(
    [Parameter(Mandatory = $true)]
    [string]$PackageName
)

Write-Host "`n[START] Installing package: $PackageName`n"

Write-Host "[1/1] Running npm install with legacy peer deps..."
npm install --save $PackageName --legacy-peer-deps
Write-Host "[DONE] Package installation complete`n"

Write-Host "[FINISH] Successfully installed $PackageName!`n"