import React from 'react'
import './CreatePage.css'
import FileUpload from './FileUpload'
import UrlUpload from './UrlUpload'

const CreatePage = () => {
  return (
    <div className='create-page'>
      {/* <FileUpload/> */}
      <UrlUpload/>
    </div>
  )
}

export default CreatePage
