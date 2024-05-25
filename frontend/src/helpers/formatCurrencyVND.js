const formatCurrencyVND = (number) => {
  return number
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "VND");
};

export default formatCurrencyVND;
