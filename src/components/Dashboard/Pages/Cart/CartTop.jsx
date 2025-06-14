const CartTop = () => {
  return (
    <div className="flex items-center justify-between shadow-md bg-widget px-3 py-3 rounded-md cursor-pointer">
      <div className="flex items-center gap-1 text-sm text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase">My Cart</span>
        </div>
      </div>
    </div>
  );
};

export default CartTop;
