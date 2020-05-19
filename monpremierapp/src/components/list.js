import React from 'react';
import ListItem from './list_item';

const List = (props) => {
    // console.log(props);

    const items = props.list.map(
        (prop) => {
            return (
                <ListItem key={prop.id} item={prop}/>
            )
        }
    );

                // <div>
                //     <h3>{prop.title}</h3>
                //     <div>
                //         {prop.feed}
                //     </div>
                // </div>

    console.log(items);
    return (
        <div>
            {props.children}
            {items}
        </div>
    )
}

// class List {
//     render(){
//     return (
//         <div>Lists</div>
//     )
// }
// }

export default List;