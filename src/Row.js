import React, {useState, useEffect, Fragment, useCallback} from 'react';
const Row = ({ondrop, ondragover}) => {
    let [columnCount, setColumnCount] = useState([]);
    let [layout, setLayout] = useState('flex');
    let [gridTotal, setGridTotal] = useState(1);

    const handleAddColumn = () => {
        setColumnCount(++columnCount);
    };

    const getColumns = useCallback(() => {
        let columns = [];
        for (let i = 0; i < columnCount; i++) {
            columns.push(
                <Column
                    layout={layout}
                    setGridTotal={setGridTotal}
                    gridTotal={gridTotal}
                    ondrop={ondrop}
                    ondragover={ondragover}
                    key={i}
                />
            );
        }
        return columns;
    });

    const getRowName = () => {
        let layoutName = layout;

        switch (layoutName) {
            case 'flex': {
                layoutName = 'flex-row';
                break;
            }
            case 'bootstrap': {
                layoutName = 'bootstrap-row';
                break;
            }
            default: {
                layoutName = '';
                break;
            }
        }
        return layoutName;
    };

    const handleLayoutChange = event => {
        setLayout(event.currentTarget.value);
        setGridTotal(1);
    };

    useEffect(() => {
        let total = 0;
        let columns = getColumns();
        columns.forEach(item => console.log(item, item.getGridValue && item.getGridValue()));
    }, [getColumns, layout]);

    return (
        <div className="row">
            <div className={`row-wrapper ${getRowName(layout)}`}>
                <div className="row-util">
                    <a className="add-columns" onClick={() => handleAddColumn()} title="Add Columns">
                        Add Columns
                    </a>
                    <select name="layout" onChange={handleLayoutChange} defaultValue="flex-row">
                        <option value="flex">Flex</option>
                        <option value="bootstrap">Bootstrap</option>
                    </select>
                </div>
                {getColumns()}
            </div>
        </div>
    );
};

const Column = ({layout, gridTotal, setGridTotal, ondrop, ondragover}) => {
    let [gridValue, setGridValue] = useState(1);

    const getGridValue = () => {
        return gridValue;
    };

    const getBootstrapClassOptions = () => {
        let grid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let options = null;

        options = grid.map((item, index) => (
            <option value={item} key={index}>
                {item}
            </option>
        ));
        return options;
    };

    const handleGridChange = event => {
        let total = parseInt(gridTotal) + parseInt(event.currentTarget.value) - gridValue;
        setGridValue(parseInt(event.currentTarget.value));
        setGridTotal(total);
    };

    return (
        <div className="column" onDragOver={ondragover} onDrop={ondrop}>
            {layout}
            <br />
            {layout === 'bootstrap' && (
                <Fragment>
                    {'gridTotal ' + gridTotal}
                    <br />
                    {'gridValue ' + gridValue}
                    <br />
                    <select onChange={handleGridChange} defaultValue={1}>
                        {getBootstrapClassOptions()}
                    </select>
                </Fragment>
            )}
        </div>
    );
};

export default Row;
