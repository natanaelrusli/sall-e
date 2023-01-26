import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import preview from '../../assets/preview.png'
import { getRandomPrompt } from '../../utils/index'
import { FormField, Loader } from '../../components'

import './index.scss'

function CreatePost() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generateImg, setGenerateImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(form.prompt && form.photo) {
      setLoading(true)

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json()
        window.location = '/'
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({
      ...form,
      prompt: randomPrompt
    })
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerateImg(true)

        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json()

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      } finally {
        setGenerateImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  return (
    <section className='createpost'>
      <div>
        <h1 className='createpost__header-label'>Create</h1>
        <p className='createpost__header-label--caption'>
          Create imaginative and stunning images through DALL-E AI and share them to the community
        </p>
      </div>

      <form className='createpost__form' onSubmit={handleSubmit}>
        <div className='createpost__form-container'>
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='createpost__form-container--img'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='createpost__form-img'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='createpost__form-img--preview'
              />
            )}

            {generateImg && (
              <div className='createpost__form-img--loader'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='createpost__form-container--btn'>
            <button
              type='button'
              onClick={generateImage}
              className='createpost__form-btn btn--green'
            >
              {generateImg ? 'Generating...' : 'Generate'}
            </button>
        </div>

        <div className='createpost__form-container--bottom'>
            <p className='createpost__form-caption'>
              Once you have created the image that you want, you can share it with others in the community
            </p>

            <button
              type='submit'
              className='createpost__form-btn btn--share'
            >
              {loading ? 'Sharing...' : 'Share with community'}
            </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost