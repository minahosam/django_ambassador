import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Layout } from '../component/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState, SyntheticEvent } from 'react';
import axios from 'axios';
import constants from '@/constants';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const {code} = router.query
  const [user, setUser] = useState(null)
  const [product, setProduct] = useState([])
  const [quantaties, setQuantaties] = useState([])
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  
  useEffect(() => {
      if (code != undefined) {
        (
          async () => {
            const {data} = await axios.get(`${constants.endPoint}/link/${code}/`)
            console.log(data)
            setUser(data.user)
            setProduct(data.products)
            setQuantaties(data.products.map(pr => ({
              id : pr.id,
              quantity : 0
            })))
          }
        )()
      }
  }, [code])
  const change = (id:number,quantity:number) => {
    setQuantaties(quantaties.map(q => {
      if (q.id === id) {
        return {
          ...q,
          quantity
        }
      }
      return q
    }))
  }

  const total = () => {
    return quantaties.reduce((s,q) => {
      const pro = product.find(p => p.id === q.id);

      return s + pro.price * q.quantity;

    },0)
  }

  const submit = async (e:SyntheticEvent) => {
    e.preventDefault()
    const {data} = await axios.post(`${constants.endPoint}/createorder/`,{
      first_name,
      last_name,
      email,
      address,
      city,
      country,
      zip,
      code,
      products:quantaties
    })
    console.log(data)
  }

  return (
    <Layout>
      <main>
        <div className="py-5 text-center">
          <h2>Welcome</h2>
          <p className="lead"> {user?.first_name} {user?.last_name} has invited you to buy these products!</p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Products</span>
            </h4>
            <ul className="list-group mb-3">
              {product.map(single => {
                return (
                    <div key={single.id}>
                      <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 className="my-0">{single.title}</h6>
                          <small className="text-body-secondary">{single.description}</small>
                        </div>
                        <span className="text-body-secondary">${single.price}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 className="my-0">Quantity</h6>
                        </div>
                        <input defaultValue={0} min='0' className='text-muted form-control' type='number' style={{'width':60}}
                        onChange={ e => change(single.id,parseInt(e.target.value))} />
                      </li>
                    </div>
                )})}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total()}</strong>
              </li>
            </ul>

          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Personal Info</h4>
            <form className="needs-validation" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="First Name" required
                  onChange={e => setFirst_name(e.target.value)} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Last Name" required
                  onChange={e => setLast_name(e.target.value)} />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com"
                  onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required
                  onChange={e => setAddress(e.target.value)}/>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Country</label>
                  <input type="text" className="form-control" id="country" placeholder="Country" required
                  onChange={e => setCountry(e.target.value)}/>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">City</label>
                  <input type="text" className="form-control" id="city" placeholder="City" required
                  onChange={e => setCity(e.target.value)}/>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="zip" placeholder="" required
                  onChange={e => setZip(e.target.value)}/>
                  <div className="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>

              <hr className="my-4"/>

              <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
            </form>
          </div>
        </div>
      </main>
      </Layout>
  )
}
