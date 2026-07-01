export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl">
        <h2 className="text-2xl font-black text-center mb-4">Quên mật khẩu</h2>
        <p className="text-xs text-gray-500 mb-6">Nhập email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu cho bạn.</p>
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Email của bạn</label>
            <input type="email" className="w-full px-4 py-2 border rounded-xl" placeholder="nhap@email.com" />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl mt-2 cursor-pointer">
            Gửi email khôi phục
          </button>
        </form>
      </div>
    </div>
  );
}