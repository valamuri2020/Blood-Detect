import React, {useState} from 'react'
import { useAuth } from  "../../contexts/AuthContext"
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { Navbar } from '../navbar/navbar'

export const Dashboard = () => {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()
    const handleLogout = async () => {
        try {
            await logout()
            history.push('/signin')

        } catch {
            setError('log out fail')
        }
    }
    return (
        <>
            <Navbar />
           dashboard
           <h3>
           {currentUser.email}
           </h3>
           <Button variant="link" onClick={handleLogout}>Log out</Button>
           {error}
        </>
    )
}