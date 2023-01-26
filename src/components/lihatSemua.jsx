import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useInfiniteQuery } from 'react-query'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MyLocationIcon from '@mui/icons-material/MyLocation';
const fetchUsers = async ({ pageParam = 1 }) => {
    const res = await fetch(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${pageParam}`);
    return res.json();
}
function LihatSemua() {
    const [loading, setLoading] = useState(true)
    const [lowongan, setLowongan] = useState([])
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState();
    const getLowonganTerbaru = async () => {
        setLoading(true)
        let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=1`
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
    const moreData = () => {
        let url = `https://medrum.herokuapp.com/feeds/?source=5718e53e7a84fb1901e05971&page=${page}&sort=popular`;
        axios.get(url).then(res => {
            setLowongan([...lowongan, ...res.data]);
          setPage(page+1)
          setLoading(false)
        });
      }
      const isScrolling =()=>{
        if(window.innerHeight + document.documentElement.scrollTop!==document.documentElement.offsetHeight){
          return;
        }
        setLoading(true)
      }
      
      useEffect(()=>{
        getLowonganTerbaru()
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
      }, [])
    
      useEffect(() => {
        if (loading){
          moreData();
        }
      }, [loading]);
    
      if (lowongan.length === 0) {
        return <h1>Loading...</h1>;
      }




    return (
        <>
         
            <div className="lowongan-terbaru">
                <Container maxWidth="lg">
                    <h3>Semua Lowongan </h3>
                    <div className="list-lowongan">
                        <Grid container spacing={3}>
                            {!loading ?
                                lowongan.map((row, index) =>

                                (

                                    <Grid item lg={6} xs={12} sx={{ mb: 5 }} key={index}>
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

export default LihatSemua