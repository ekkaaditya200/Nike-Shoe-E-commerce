import PropTypes from 'prop-types'
import {ChevronDoubleLeftIcon,XMarkIcon} from '@heroicons/react/24/solid';
const Order = ({onClearCartItems,onCartToggle,totalQTY}) => {
  return (
    <div className='bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 w-full'>
    <div className='flex items-center gap-3'>
        <div className='grid items-center cursor-pointer'>
            <ChevronDoubleLeftIcon className='w-5 h-5 text-slate-900 hover:text-orange-500 stroke-[2]' />
        </div>
        <div className='grid items-center'>
            <h1 className='text-base font-medium text-slate-900'>Your Order <span className='bg-theme-cart rounded px-1 py-0.5 text-slate-100 font-normal text-sm'>({totalQTY} Items)</span></h1>
        </div>
    </div>
  </div>
  )
}
Order.propTypes = {
    onCartToggle:PropTypes.func.isRequired,
    onClearCartItems:PropTypes.func.isRequired,
    totalQTY:PropTypes.number.isRequired,
}
export default Order
