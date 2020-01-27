<# 
 # The concern of this module is to provide a poweshell-core front-end with a simple text-based UI to 
 # return the lasets currency exchange rates as well as pass the required parameters into the node-based 
 # back-end
 #>

<# INTRO #>
$intro = @"
  ____     
 / __ \  
/ /  \ \ Mr. Paul's
\ \__/ / Currency Converter
 \____/  
"@

<# FUNCTION #>
function curCon {
    param(
        # Insert Last Name
        [Parameter(Mandatory = $true)]
        [string]
        $base_currency,
        [Parameter(Mandatory = $true)]
        [string]
        $transaction_currency,
        [Parameter(Mandatory = $true)]
        [string]
        $exchange_amount
        
    )
    $base_currency = $base_currency.toUpper();
    $transaction_currency = $transaction_currency.toUpper();
    if ($baseCurrency -eq "q") { exit }
    node ..\..\app $base_currency $transaction_currency $exchange_amount
    Pause
    Clear-Host
}


write-host $intro
Pause
Clear-Host

<# MENU #>
$latestRates = Invoke-WebRequest -method GET https://api.exchangeratesapi.io/latest;
$latestRatesParsed = $latestRates | ConvertFrom-Json;
$output = $latestRatesParsed.rates | Out-String



#S3 BIND THE INPUT
Write-Host $output -ForegroundColor Cyan 
while ($true) {
    curcon
}
