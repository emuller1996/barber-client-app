export default function formartNumber(number){
    return new Intl.NumberFormat("ES-MX", {
        style: "currency",
        currency: "MXN",
        maximumSignificantDigits: 2
      }).format(number)
}