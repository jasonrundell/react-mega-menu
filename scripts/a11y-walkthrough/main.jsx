import React from 'react'
import { createRoot } from 'react-dom/client'
import '@jasonrundell/topiary/style.css'
import Menu from '../../dist/index.es.js'
import '../../dist/style.css'

createRoot(document.getElementById('root')).render(<Menu />)
