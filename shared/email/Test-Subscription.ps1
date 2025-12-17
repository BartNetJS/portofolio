# Test-Subscription.ps1
# Usage: .\Test-Subscription.ps1 -WebAppUrl "https://script.google.com/macros/s/..." -Email "test@example.com"

param(
    [Parameter(Mandatory = $false)]
    [string]$WebAppUrl = "https://script.google.com/macros/s/AKfycbxwQPAMiTNEyA1K2swKab_E4dhIbimTbwB6zvCUqOFSScU99bpIeC6oIKJva7yoDekK/exec",

    [string]$Email = "test@example.com"
)

$Body = @{
    email = $Email
}

try {
    Write-Host "Sending request to $WebAppUrl..."
    $Response = Invoke-RestMethod -Uri $WebAppUrl -Method Post -Body $Body
    Write-Host "Response:"
    Write-Host ($Response | ConvertTo-Json -Depth 2)
}
catch {
    Write-Error "Failed to send request: $_"
}
