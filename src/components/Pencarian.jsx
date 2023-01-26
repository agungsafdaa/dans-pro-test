import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useLocation } from 'react-router-dom';
function Pencarian() {
    const { state } = useLocation();
    console.log(state)
    const [loading, setLoading] = useState(true)




    return (
        <>

            <div className="lowongan-terbaru">
                <Container maxWidth="lg">
                    <h3>Hasil Pencarian</h3>
                    <div className="list-lowongan">
                        <Grid container spacing={3}>
                            {state.length === 0 ? <Grid item lg={12}>
                                <h2 style={{ textAlign: 'center' }}>Tidak ada data</h2>
                            </Grid> :
                                state.map((row, index) =>

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

                            }

                        </Grid>

                    </div>
                </Container>
            </div>
        </>
    )
}

export default Pencarian