const Header = () => {
    return (
        <>
        <header className="relative w-[100vw] h-[80px] flex justify-around items-center text-white bg-black">
            <div>
                <span className="text-3xl font-bold cursor-pointer">MediDoc</span>
            </div>
            <div className="relative w-auto h-[100%] flex justify-end items-center gap-4">
                <div className="relative flex justify-center items-center h-[100%] hover:bg-gray-700 hover:text-blue-300 font-light p-2 cursor-pointer hover:underline">
                    <span className="">Need help? Contact us!</span>
                </div>
                <span className="text-xl">Hi User</span>
            </div>
        </header>
        </>
    )
}

export default Header;