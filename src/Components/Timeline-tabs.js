
function TimelineTabs({onTabSelected}) {
    
    const amounts = ['5 Min', '1 Hr', '1 D'];
    
    const handleTabClick = (amount) => {
        onTabSelected(amount)
    };

    return (
        <div className="tab-container">
            {amounts.map((amount) => (
                <button onClick={()=>handleTabClick(amount)} key={amount} className="tab">
                    {amount}       
                </button>
            ))}

        </div>
    );
}

export default TimelineTabs;