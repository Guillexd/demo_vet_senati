import '../../css/checkbox.css'

export default function CheckBox({ id, message, checked, onChange}) {

  return (
    <section className='flex flex-col items-center'>
      <div className="checkbox-wrapper-5">
        <div className="check">
          <input id={id} type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={id}></label>
        </div>
      </div>
      <label
        className='pointer-events-none max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-600 -translate-y-[.5rem]'
      >
        {message}
      </label>
    </section>
  )
}
