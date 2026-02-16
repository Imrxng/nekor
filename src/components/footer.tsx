import '@/styles/footer.component.css';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>&copy; Copyright {year} Nekor BV. Alle rechten voorbehouden.</p>
        </footer>
    )
}

export default Footer