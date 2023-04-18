
import { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiGateway } from '../config/apiGateway'
import { AppContext } from '../AppContext'

export const EditData = () => {
    const [tableData, setTableData] = useContext(AppContext)
    const navigate = useNavigate()
    const params= useParams()
    const keyvalue = params.id
    const [row] = useState(() => tableData.find( i => i.relcod===keyvalue))

    const handleBackClick = () => {
        navigate('/')
    }

    const schema = z.object({
        relcod: z.string().nonempty(),
        reldes: z.string().nonempty(), 
        reldesc: z.string().nonempty()
    })

    const { register, handleSubmit, formState: { errors } } = useForm( 
        { resolver: zodResolver(schema) } )
    
    const onSubmit = async (data) => {
        const newData = { ...data, update_ident : row.update_ident + 1 }
        try {
            await apiGateway.patch(`/tbrelcod/${keyvalue}/?_keyname=relcod&_keytype=string`, newData )
            const newTable = tableData.filter(data => data.relcod !== keyvalue)
            setTableData([...newTable, newData])
            navigate('/')
        }   
        catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure?'))
        {
            try {
                await apiGateway.delete(`/tbrelcod/${keyvalue}/?_keyname=relcod&_keytype=string`)
                const newTable = tableData.filter(data => data.relcod !== keyvalue)
                setTableData(newTable)
                navigate('/')
            }   
            catch (err) {
                console.log(err)
            }    
        }
    }

    return (
        <div className='create-recipe'>
            <div>
                <button onClick={ handleBackClick }>返回</button>
            </div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                <label htmlFor='relcod'>關係代碼</label>
                <input type='text' defaultValue={row.relcod} { ...register('relcod') } readOnly="readonly" />
                { errors.relcod && <span> { errors.relcod.message } </span> }

                <label htmlFor='reldes'>關係名稱－葡</label>
                <input type='text' defaultValue={row.reldes} { ...register('reldes') } autoFocus/>
                { errors.reldes && <span> { errors.reldes.message } </span> }

                <label htmlFor='reldesc'>關係名稱－中</label>
                <input type='text' defaultValue={row.reldesc} { ...register('reldesc') }/>
                { errors.reldesc && <span> { errors.reldesc.message } </span> }

                <button type='submit'>保存</button>
                <button type='button' onClick={ handleDelete }>刪除</button>
            </form>
        </div>
    )
}