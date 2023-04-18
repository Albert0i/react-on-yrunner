import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../AppContext'

export const Home = () => {
    const [tableData] = useContext(AppContext)
    const navigate = useNavigate()

    const handleAddClick = () => {
        navigate('/add')
    }
    const handleEditClick = (id) => {
        navigate(`/${id}`)
    }
    
    return (
            <div className='container'>                
                <table>
                    <thead>
                    <tr>
                        <th><button onClick={ handleAddClick }>新增</button></th>
                    </tr>                        
                    <tr>
                        <th></th><th>關係</th><th>關係名稱 (葡)</th><th>關係名稱 (中)</th>
                    </tr>            
                    </thead>
                    <tbody>
                    { tableData.map(row => (
                        <tr key={row.relcod}>
                            <td><button onClick={ ()=> handleEditClick(row.relcod)  }>編輯</button></td>
                            <td>{row.relcod}</td>
                            <td>{ row.reldes }</td>
                            <td>{ row.reldesc }</td>
                        </tr>
                    ) )}
                    </tbody>
            </table>
            </div>            
        )
}
