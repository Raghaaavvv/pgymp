function Gymequipment() {
   
    const equipmentname = [{"name": "Benches", "quantity": 2}, 
        {"name": "Dumbbells", "quantity": 10}, {"name": "Barbells", "quantity": 2}, {"name": "Backmachines", "quantity": 1}, 
        {"name": "Treadmills", "quantity": 3}, {"name": "Ellipticals", "quantity": 1}, {"name": "Legpresses", "quantity": 1}];
        

    equipmentname.sort((a, b) => a.quantity - b.quantity);

    const lowQuantity = equipmentname.filter((item) => 
        item.quantity < 3).map( (item) => <li className="low-quantity">{item.name}: {item.quantity}</li>);

    const HighQuantity = equipmentname.filter( (item) => item.quantity >=3)
    .map( (item) => <li className="high-quantity">{item.name}: {item.quantity}</li>);

    return (
        <ol className="equipment-list">
            {lowQuantity}
            {HighQuantity}
        </ol>
    );

}

export default Gymequipment;