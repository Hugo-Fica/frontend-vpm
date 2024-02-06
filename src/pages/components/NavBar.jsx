import { Box, Drawer, Button, Typography } from '@mui/material'
import { SettingModal } from './SettingModal'
import { useState } from 'react'
import { AddModal } from './AddModal'
import { AddModal2 } from './AddModal2'
import { AddModal3 } from './AddModal3'
import { AddModal4 } from './AddModal4'
import { Link } from 'react-router-dom'
import globalPng from '../../assets/glopalGraphs.png'
import areaPng from '../../assets/areaGraph.png'
import activityPng from '../../assets/activityGraph.png'

export const NavBar = () => {
  const [navbar, setNavbar] = useState(1)
  console.log(navbar)
  return (
    <Box component='nav' sx={{}}>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            width: '91%',
            height: '50px',
            background: '#0B5394',
            ml: 21,
          },
        }}
      >
        <Button
          sx={{ color: 'white', ...(navbar === 1 && { bgcolor: '#2a87db' }) }}
          onClick={() => setNavbar(1)}
        >
          <Link to={'home'} style={{ textDecoration: 'none', color: 'white' }}>
            Vector
          </Link>
        </Button>
        {navbar === 1 && (
          <Box component='nav'>
            <Drawer
              variant='permanent'
              open
              sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': {
                  display: 'flex',
                  flexDirection: 'row',
                  boxSizing: 'border-box',
                  width: '91%',
                  height: '100px',
                  background: '#2a87db',
                  ml: 21,
                  mt: 'calc(50px)',
                },
              }}
            >
              <AddModal />
              <AddModal2 />
              <AddModal4 />
              <AddModal3 />
              <Typography
                sx={{
                  color: 'white',
                  position: 'absolute',
                  left: 0,
                  transform: 'translateY(81px) translateX(151px)',
                  zIndex: 10,
                  fontSize: '13px',
                }}
              >
                Create Vector
              </Typography>
            </Drawer>
          </Box>
        )}
        <Button
          sx={{ color: 'white', ...(navbar === 2 && { bgcolor: '#2a87db' }) }}
          onClick={() => setNavbar(2)}
        >
          <Link
            to={'export-report'}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Report
          </Link>
        </Button>
        <Button
          sx={{ color: 'white', ...(navbar === 3 && { bgcolor: '#2a87db' }) }}
          onClick={() => setNavbar(3)}
        >
          <Link
            to={'global-graph'}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Graphs
          </Link>
        </Button>
        {navbar === 3 && (
          <Box component='nav'>
            <Drawer
              variant='permanent'
              open
              sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': {
                  display: 'flex',
                  flexDirection: 'row',
                  boxSizing: 'border-box',
                  width: '91%',
                  height: '100px',
                  background: '#2a87db',
                  ml: 21,
                  mt: 'calc(50px)',
                },
              }}
            >
              <Button>
                <Link
                  to={'global-graph'}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <img src={globalPng} width={80} />
                </Link>
              </Button>
              <Button>
                <Link
                  to={'area-graph'}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <img src={areaPng} width={80} />
                </Link>
              </Button>
              <Button>
                <Link
                  to={'activity-graph'}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <img src={activityPng} width={80} />
                </Link>
              </Button>
            </Drawer>
          </Box>
        )}
        <SettingModal />
      </Drawer>
    </Box>
  )
}
