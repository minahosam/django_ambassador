import { Layout } from '@/component/Layout'
import React from 'react'

const Error = () => {
  return (
    <Layout>
        <div className="py-5 text-center">
            <h2>Error</h2>
            <p className="lead">Couldnot process payment!</p>
        </div>
    </Layout>
  )
}

export default Error