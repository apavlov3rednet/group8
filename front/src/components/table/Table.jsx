export default function Table({ children, ...props}) {
    const Header = function() {
        let firstRow = children[0];
        let headerCol = [];

        for(let index in firstRow) {
            let col = firstRow[index];
            headerCol.push(index);
        } 
        
        headerCol.forEach((item, index) => {
            <th key={index}> {item} </th>
        })
    }

    return (
        <table>
            <thead>
               { Header() }
            </thead>
        </table>
    )
}