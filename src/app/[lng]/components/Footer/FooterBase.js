import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'

export const FooterBase = ({ t, lng }) => {
  return (
    <footer className='flex justify-center md:justify-end m-3'>
      {/* <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans> */}
      {languages.map((l, index) => {
        
        return (
          <span className='bg-yellow-400 mx-1 w-10 h-6 flex justify-center items-center rounded-lg uppercase' key={l}>
            {/* {index > 0 && (' or ')} */}
            <Link href={`/${l}`}>
              {l}
            </Link>
           
          </span>
        )
      })}
    </footer>
  )
}