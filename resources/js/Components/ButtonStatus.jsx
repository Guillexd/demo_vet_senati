import { toast } from 'react-toastify';
import Icon from '../utils/Icon';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ToastifyErrorList from './ToastifyErrorList';
import Spinner from './presentational/Spinner';
import { fetchHelper } from '../utils/utils';
import { useState } from 'react';

export default function ButtonStatus({ isActive, id, name, model, setHelper, setMustLoad, css = null }) {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const changeStatus = () => {
    const loadingToastId = toast(<Spinner message={`Cambiando estado`} />, { autoClose: 3000, hideProgressBar: true, });
    fetchHelper('POST', '/generic/change-status', { id, model, isActive: isActive ? 0 : 1 })
      .then((data) => {
        setMustLoad(false)
        if (data.errors) {
          return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
        }
        toast.update(loadingToastId, { render: `Estado de ${name} ${isActive ? 'inactivo' : 'activo'}.`, type: isActive ? toast.TYPE.ERROR : toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
        setHelper((prev) => prev + 1)
      })
      .catch((err) => {
        toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
      })
  }
  return (
    <>
      {
        isActive
          ?
          <button className={`absolute ${css || 'top-1 right-2'} rounded-full bg-green-500 hover:bg-white w-10 h-10 flex justify-center items-center font-bold font-mono text-xl text-white hover:text-red-500`}
            onClick={changeStatus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Icon icon={isHovered ? faCircleXmark : faCircleCheck} size='36px' />
          </button>
          :
          <button className={`absolute ${css || 'top-1 right-2'} rounded-full bg-red-500 hover:bg-white w-10 h-10 flex justify-center items-center font-bold font-mono text-xl text-white hover:text-green-500`}
            onClick={changeStatus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Icon icon={isHovered ? faCircleCheck : faCircleXmark} size='36px' />
          </button>
      }
    </>
  )
}
