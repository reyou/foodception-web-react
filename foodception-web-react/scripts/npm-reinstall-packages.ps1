# Set default value for legacy peer deps
$useLegacyPeerDeps = $false
$legacyPeerDepsFlag = if ($useLegacyPeerDeps) { "--legacy-peer-deps" } else { "" }

Write-Host "`n[START] Starting cleanup process...`n"

Write-Host "[1/3] Cleaning npm cache..."
npm cache clean --force
Write-Host "[DONE] npm cache cleaned`n"

Write-Host "[2/3] Removing node_modules and package-lock.json..."
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Write-Host "[DONE] Removed node_modules and package-lock.json`n"

Write-Host "[3/3] Installing packages$(if ($useLegacyPeerDeps) { ' with legacy peer deps' } else { '' })..."
npm install $legacyPeerDepsFlag
Write-Host "[DONE] Package installation complete`n"

Write-Host "[FINISH] All done! Happy coding!`n"
