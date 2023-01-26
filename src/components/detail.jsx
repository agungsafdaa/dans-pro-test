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
import { useLocation } from 'react-router-dom';

function Detail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state)
    const [loading, setLoading] = useState(true)

    return (
        <>

            <div className="lowongan-terbaru">
                <Container maxWidth="lg">
                    <div className="list-lowongan">
                        <Grid container spacing={3}>


                            <Grid item lg={12} xs={12} sx={{ mb: 5 }} >
                                <Card sx={{ minWidth: 275 }} className="card-detail">
                                    <CardContent>
                                        <div className="heading" style={{ marginBottom: '20px' }}>
                                            <div className="logo">
                                                <img src={state.company_logo} alt='logo' loading="lazy" />
                                            </div>
                                            <div className="nama">
                                                <h5>
                                                    {state.title}
                                                </h5>
                                                <Typography><span><CorporateFareIcon /></span>{state.company}</Typography>
                                                <Typography><span><MyLocationIcon /></span>{state.location}</Typography>
                                                <Button size="small" variant="outline">{state.type}</Button>

                                            </div>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: state.description }}></div>
                                        <br/>
                                        <div dangerouslySetInnerHTML={{ __html: state.how_to_apply }}></div>
                                        <Button size="small" variant="outline" style={{color:'#fff;'}} sx={{mt:2}}>Daftar Pekerjaan</Button>


                                    </CardContent>
                                 
                                </Card>
                            </Grid>


                        </Grid>

                    </div>
                </Container>
            </div>
        </>
    )
}

export default Detail