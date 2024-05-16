import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Icon({ css, icon, size = '17px' }) {
  return (
    <FontAwesomeIcon className={css} icon={icon} style={{ fontSize: size }} />
  )
}
