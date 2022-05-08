import React, {Fragment} from 'react'

const About = () => {
  return (
    <Fragment>
    <div class="lg:2/6 xl:w-2/4 mt-20 lg:mt-40 lg:ml-16 text-left">
            <div className="text-5xl font-medium text-gray-900 w-64 leading-none">A major ally for the digitalization of your restaurant.</div>
            <div className="mt-6 text-xl font-bold text-primary antialiased">Easy to use and quick to set up, it takes no commission.​​​​​
           
            </div>
            <div>
            <ul className='p-8 list-disc font-semibold'>
              <li>
              sell its products in click and collect 
              </li>
              <li>allow your customers to order and pay from their table</li>
            </ul>
            </div>
            <div className=' bg-gray-900 shadow-2xl'>
            <img src="https://www.deliver-by-linkeo.com/ressources/images/69f19e1405ca.jpg" 
           className=" border-black rounded-xl content-end absolute inset-y-1/4 shadow-2xl
            right-12"/>
            </div>
          
          </div>
      <div>
        <img />
      </div>
    </Fragment>
  )
}

export default About;
