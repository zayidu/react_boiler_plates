import React from 'react';

const ListItem = ({item}) => {
    console.log(item);
    return (
        <div>
            <h3>{item.title}</h3>
            <div>
                {item.feed}
            </div>
        </div>
    )
}

export default ListItem;