function LocationTab(props) {
    const handleClick = () => {
        props.onClick(props.name);// handle the select location
    }

    if(props.selectedLocation === props.name){
        return(
            <div className="text-base bg-gray-200 border rounded-md px-2 py-1 cursor-pointer" onClick={handleClick}>
                {props.name}
            </div>

        );
    }
    return(
        <div className="text-base border rounded-md px-2 py-1 cursor-pointer" onClick={handleClick}>
            {props.name}
        </div>
    )
}

export default LocationTab;