import React, {useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
// import ReactDOM from 'react-dom';

const Template = () => {
    let [rows, addRows] = useState([]);

    const allowDrop = ev => {
        ev.preventDefault();
    };

    const drag = ev => {
        ev.dataTransfer.setData('component', ev.target.id);
    };

    const drop = ev => {
        ev.preventDefault();
        let elementId = ev.dataTransfer.getData('component');
        let element = elementId && document.getElementById(elementId);
        
        if(element){
            let NewElement = element.cloneNode(true);
            NewElement.removeAttribute("draggable");
            ev.currentTarget.appendChild(NewElement);
        }
    };

    const getRows = () => {
        return rows.map((item, index) => <Fragment key={index}>{item}</Fragment>);
    };

    const handleRowAdd = rows => {
        let rowObj = <Row ondrop={drop} ondragover={allowDrop} />;
        let newRow = [...rows, rowObj];
        addRows(newRow);
    };

    const getDragabbleComponents = () => {
        let items = [1, 2, 3, 4, 5, 6, 7];
        let components = items.map((item, index) => (
            <div id={`component-${index}`} draggable="true" onDragStart={drag} className="comp">
                {`component ${item}`}
                {/* <img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69" /> */}
            </div>
        ));
        return components;
    };

    return (
        <div className="root">
            <header>
                <button onClick={() => handleRowAdd(rows)}>Add Row</button>
            </header>
            <main id="container">
                <aside className="components-container">{getDragabbleComponents()}</aside>
                <div className="row-container">{getRows()}</div>
            </main>
        </div>
    );
};

export default Template;
