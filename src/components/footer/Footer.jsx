import React from 'react'
import './footer.css'

function Footer() {
  return (
    <footer>
      <p className="footer">© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </footer>
  )
}

export default Footer
