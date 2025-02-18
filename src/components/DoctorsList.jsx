// DATA
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import PaginationControls from "./PaginationControls";

// RENDER DOCTOR LIST
const DoctorList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // RICEVI MEDICI
    const getDoctors = async (params = {}) => {
        try {
            const response = await axios.get(`${backendUrl}/medici`, {
                params: {
                    ...params,
                    page: params.page || 1,
                    limit: 6
                }
            });
            setDoctors(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Errore nel caricamento dei medici:", error);
        }
    };

    // GESTISCE CAMBIO PAGINA
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        updateSearchParams({
            specializzazione: selectedSpecialization,
            search,
            page: newPage
        });
    };

    // CARICA SPECIALIZZAZIONI
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                // TUTTI I MEDICI PER CARICARE TUTTE LE SPECIALIZZAZIONI
                const response = await axios.get(`${backendUrl}/medici`, {
                    params: {
                        limit: 1000, // Setta limite alto per caricare tutte le specializzazioni
                        orderBy: 'specializzazione' // Aggiungi orderBy per ordinare specializzazioni
                    }
                });
                // USA LOCALCOMPARE PER ORDINARE SPECIALIZZAZIONI ALFABETICAMENTE
                const uniqueSpecializations = [...new Set(response.data.data.map(doc => doc.specializzazione))]
                    .sort((a, b) => a.localeCompare(b, 'it', { sensitivity: 'base' }));
                setSpecializations(uniqueSpecializations);
            } catch (error) {
                console.error("Errore nel caricamento delle specializzazioni:", error);
            }
        };
    
        fetchSpecializations();
    }, [backendUrl]);

    // GESTISCE PARAMS DAL URL E FA LA RICERCA INIZIALE
    useEffect(() => {
        const specFromUrl = searchParams.get("specializzazione") || "";
        const searchFromUrl = searchParams.get("search") || "";
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;

        setSelectedSpecialization(specFromUrl);
        setSearch(searchFromUrl);
        setCurrentPage(pageFromUrl);

        const params = Object.fromEntries(searchParams.entries());
        getDoctors(params);
    }, [searchParams]);

    // UPDATE DEI PARAMETRI DI RICERCA
    const updateSearchParams = (newParams) => {
        const updatedParams = new URLSearchParams(searchParams);

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                updatedParams.set(key, value);
            } else {
                updatedParams.delete(key);
            }
        });

        setSearchParams(updatedParams);
    };

    // GESTIONE SEARCH
    const handleSearch = () => {
        updateSearchParams({ specializzazione: selectedSpecialization, search });
    };

    return (

        <section className="mb-2">

            <div className="search">
                <div className="filters mb-2">
                    <select
                        value={selectedSpecialization}
                        onChange={(event) => {
                            const value = event.target.value;
                            setSelectedSpecialization(value);
                            updateSearchParams({ specializzazione: value, search });
                        }}
                        className="form-select"
                    >
                        <option value="">Tutte le Specializzazioni</option>
                        {specializations.map((spec, index) => (
                            <option key={index} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="searchbar mb-4">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") handleSearch();
                        }}
                        className="form-control search-input"
                        placeholder="Cerca medico per nome o cognome..."
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="search-btn mb-4"
                >
                    <i className="fa-solid fa-magnifying-glass"></i> Cerca
                </button>
                <div className="search-length mb-2">
                    Medici trovati: {pagination.totalItems}
                </div>
            </div>

            {/* Paginator Control */}
            <PaginationControls
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {/* Doctor Cards */}
            {doctors.length > 0 ? (
                <div className="row g-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
                            <DoctorCard doctor={doctor} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-danger mt-4">
                    Nessun medico trovato. Riprova con un altro filtro.
                </div>
            )}

            {/* Paginator Control */}
            <PaginationControls
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

        </section>

    );
    
};

// EXPORT
export default DoctorList;
