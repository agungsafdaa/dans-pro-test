import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [lowongan, setLowongan] = useState([])
    const [pencarian, setPencarian] = useState([])
    const [name, setName] = useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    };
    const getLowonganTerbaru = async () => {
        setLoading(true)
        let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setLowongan(response.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const cariLowongan = async () => {
        setLoading(true)
        let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${name}`
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                navigate('/pencarian', { state: response.data });
            }
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        getLowonganTerbaru()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div className="hero">
                <Container maxWidth="lg">
                    <div className="content">
                        <div className="welcome-text">
                            <h3>Temukan<br />
                                Pekerjaan <span>impianmu</span></h3>
                            <div className="search">
                                <FormControl sx={{ mt: 3, width: 1 }} variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={name}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end" className="toggle" onClick={cariLowongan}>
                                                <IconButton
                                                    aria-label="toggle password visibility"

                                                    edge="end"
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Cari Lowongan"
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="asset">
                            <img src="../img/hero.png" alt="hero" />
                        </div>
                    </div>
                </Container>
            </div>
            <div className="lowongan-terbaru">
                <Container maxWidth="lg">
                    <h3>Lowongan Terbaru</h3>
                    <div className="list-lowongan">
                        <Grid container spacing={3}>
                            {!loading ?
                                lowongan.slice(0, 6).map((row, index) =>

                                (

                                    <Grid item lg={4} xs={12} sx={{ mb: 5 }} key={index}>
                                        <Card sx={{ minWidth: 275 }} className="card-lowongan">
                                            <CardContent>
                                                <div className="heading">
                                                    <div className="logo">
                                                        <Link to="/detail" state={row}>
                                                            <img src={row.company_logo} alt='logo' loading="lazy" />
                                                        </Link>
                                                    </div>
                                                    <div className="nama">
                                                        <h5>
                                                            <Link to="/detail" state={row}>
                                                                {row.title}

                                                            </Link>
                                                        </h5>
                                                        <Typography><span><CorporateFareIcon /></span>{row.company}</Typography>
                                                        <Typography><span><MyLocationIcon /></span>{row.location}</Typography>

                                                    </div>
                                                </div>


                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" variant="outline">{row.type}</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                                :

                                <>
                                    <Grid item lg={4} xs={12}>

                                        <Card sx={{ minWidth: 275 }} className="card-lowongan">
                                            <CardContent>
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />

                                            </CardContent>
                                            <CardActions>
                                                <Skeleton />

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={4} xs={12}>

                                        <Card sx={{ minWidth: 275 }} className="card-lowongan">
                                            <CardContent>
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />

                                            </CardContent>
                                            <CardActions>
                                                <Skeleton />

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={4} xs={12}>

                                        <Card sx={{ minWidth: 275 }} className="card-lowongan">
                                            <CardContent>
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />

                                            </CardContent>
                                            <CardActions>
                                                <Skeleton />

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </>
                            }

                        </Grid>
                        <Link to="lihat-semua">
                            <div className="see-all">
                                <Button size="small" variant="outline">Lihat Semuanya</Button>

                            </div>
                        </Link>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home