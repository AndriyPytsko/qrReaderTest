import React, { useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { basketContext } from "../../providers/basketProvider/basketProvider";

export function Header() {
  const { basket } = useContext(basketContext);
  return (
    <header className="header">
      <Link to="/" className="headerTitle">
        QR reader
      </Link>
      <Link className="basketLink" to="/basket">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACQklEQVR4nO2YPWsVQRSGn4hRkyI2fjQmaJMm+A8kmioGK20UEVSSdNoEf4EGooW2KoISbRQ1hTaiWGkjYohI2mg+SFJEUZQE/FpZGGV5nQ2z987MbrEPnGrOvOc9u/ee3R2oqakpyhZgFPgA/AaSJuOX0bpgtIOyAXjuwXRePDM1gnEqoPnExMmQDbyN0MA7oCWE+T4p9BPY7UG3C/gh2vsJwIQUue9R+6FoP8AztqvU61H/QKC7+49Llt+pb6akxpgv4TZgRcQH8c+Q1PgEtPsQHhbhj76EHS5U2pT30ent1lq46Hukhhqd0UbqROjxFnKkRnvAOIzUPTjQD8xGeFVoNmaN1/94XwFziWPM2BpYqoCxxDEWbQ3cq4CxxDHu2hoYlKQXVIeX4u20LWmXJKUTaCvl0wF8F2+decnTkniY8jlS5EXyiiRfpXyuiafL6yX3u4wrwyFgAZgHBgKs54136zMg+0a4Jhu6c3LnMzlzAdYxtbNeVo3HdXkqm87k5Olo872eclZynuDAOdn0qMQGHkvOiEsDe2XTN2BzCQ1sAr5KTg+OZH+fiXlDjN1An6wvFPm4ueXwFRb6TzwmHm5SgGOy+Y0lZ8CYSIsfDLA+KR6OFmlgmzk1/rs5PYXeQTx2ysl36mV7UZHXcgWOE48TUvtVIyKjIjJOPO5I7fONiPSKyFKoU2OhxXywZGvvowE2Ap8t4y52fAFaaZAbFWjgOk3QaXmoxYw586HVFOn50G1gOaLxZTM00to1NTU1VJc/mEC6fyHRB9kAAAAASUVORK5CYII=" />
        <span className="basketHeaderCount">{basket.length}</span>
      </Link>
    </header>
  );
}
