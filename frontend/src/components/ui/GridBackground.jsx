

const GridBackground = ({ children }) => {
    return (
        (
            <div className="h-screen w-full bg-white  bg-grid-small-black/[0.2] relative ">
                <div className="absolute pointer-events-none inset-0  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                {children}
            </div>)
    );
}

export default GridBackground;

