import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiGateway } from '../config/apiGateway'
import { AppContext } from '../AppContext'

export const AddData = () => {
    const [tableData, setTableData] = useContext(AppContext)
    const [defaultData, ] = useState({
        relcod: 'KK',
        reldes: 'testing1',
        reldesc: '測試一'
    })
    const navigate = useNavigate()

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
        const newData = { ...data, update_ident : 0 }
        try {
            await apiGateway.post('/tbrelcod', newData )            
            setTableData([...tableData, newData])
            navigate('/')
        }   
        catch (err) {
            console.log(err)
        }
    }    

    return (
        <div className='create-recipe'>
            <div>
                <button onClick={ handleBackClick }>返回</button>
            </div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                <label htmlFor='relcod'>關係代碼</label>
                <input type='text' defaultValue={defaultData.relcod} { ...register('relcod') } autoFocus />
                { errors.relcod && <span> { errors.relcod.message } </span> }

                <label htmlFor='reldes'>關係名稱－葡</label>
                <input type='text' defaultValue={defaultData.reldes} { ...register('reldes') }/>
                { errors.reldes && <span> { errors.reldes.message } </span> }

                <label htmlFor='reldesc'>關係名稱－中</label>
                <input type='text' defaultValue={defaultData.reldesc} { ...register('reldesc') }/>
                { errors.reldesc && <span> { errors.reldesc.message } </span> }

                <button type='submit'>建立</button>
            </form>
        </div>
    )
}