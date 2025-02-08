import React from 'react';
import AuthLayout from '../componentes/AuthLayout';
import AddFruitForm from '../componentes/AddFruitForm';

const AddFruit = () => {
    const handleSaveFruit = (fruit) => {
        console.log('Nueva fruta guardada:', fruit);
        alert(`Fruta "${fruit.name}" guardada con éxito!`);
    };

    return (
        <div>
            <AddFruitForm onSave={handleSaveFruit} />
        </div>
    );
};

export default AddFruit;
