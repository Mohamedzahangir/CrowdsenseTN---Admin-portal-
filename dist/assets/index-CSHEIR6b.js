(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const m={BUSES:"crowdsense_admin_buses",ROUTES:"crowdsense_admin_routes",DEVICES:"crowdsense_admin_devices",ALERTS:"crowdsense_admin_alerts",USERS:"crowdsense_admin_users",SETTINGS:"crowdsense_admin_settings",ACTIVITIES:"crowdsense_admin_activities",TRACKING:"crowdsense_live_tracking",OCCUPANCY:"crowdsense_live_occupancy"},ne=[{id:"47A",number:"TN-23-N-4512",name:"Vellore Express",type:"Express",source:"Vellore Bus Terminus",destination:"Katpadi Jn.",platform:"P4",capacity:60,status:"Active",deviceId:"ESP32-047A",driverName:"K. Rajendran"},{id:"19B",number:"TN-01-N-8829",name:"T. Nagar Loop",type:"Local",source:"Adyar Depot",destination:"T. Nagar Bus Terminus",platform:"P1",capacity:60,status:"Active",deviceId:"ESP32-019B",driverName:"M. Saravanan"},{id:"23C",number:"TN-01-N-6610",name:"Thiruvanmiyur Fast",type:"Fast",source:"Mylapore Temple",destination:"Thiruvanmiyur",platform:"P2",capacity:60,status:"Active",deviceId:"ESP32-023C",driverName:"R. Krishnan"},{id:"M70",number:"TN-01-N-3211",name:"Broadway Special",type:"City",source:"Guindy Estate",destination:"Broadway",platform:"P3",capacity:75,status:"Active",deviceId:"ESP32-0M70",driverName:"S. Murugan"},{id:"102",number:"TN-11-N-9022",name:"Kelambakkam Local",type:"Local",source:"Adyar Depot",destination:"Kelambakkam",platform:"P5",capacity:70,status:"Active",deviceId:"ESP32-0102",driverName:"G. Sekar"},{id:"570",number:"TN-11-N-7733",name:"OMR Express",type:"Express",source:"Koyambedu",destination:"Siruseri IT Park",platform:"P6",capacity:70,status:"Inactive",deviceId:"ESP32-0570",driverName:"P. Loganathan"}],oe=[{number:"47A",name:"Vellore Express Route",source:"Vellore Bus Terminus",destination:"Katpadi Jn.",stops:[{name:"Vellore Bus Terminus",distance:0,scheduledTime:"09:15 AM",lat:12.9238,lng:79.1352},{name:"Vellore Fort",distance:2.5,scheduledTime:"09:25 AM",lat:12.9275,lng:79.1302},{name:"Green Circle",distance:5.8,scheduledTime:"09:40 AM",lat:12.9372,lng:79.1355},{name:"Silk Mill",distance:9,scheduledTime:"09:55 AM",lat:12.946,lng:79.1415},{name:"Katpadi Jn.",distance:12,scheduledTime:"10:15 AM",lat:12.968,lng:79.1378}],dailyPassengers:1250,occupancyStats:{peak:"82%",avg:"55%"}},{number:"19B",name:"T. Nagar Loop Route",source:"Adyar Depot",destination:"T. Nagar Bus Terminus",stops:[{name:"Adyar Depot",distance:0,scheduledTime:"09:30 AM",lat:13.0064,lng:80.2577},{name:"Saidapet Stop",distance:3.1,scheduledTime:"09:42 AM",lat:13.021,lng:80.2227},{name:"Little Mount",distance:4.8,scheduledTime:"09:50 AM",lat:13.0163,lng:80.2205},{name:"Nandanam",distance:6.2,scheduledTime:"09:58 AM",lat:13.0298,lng:80.2335},{name:"T. Nagar Bus Terminus",distance:8.5,scheduledTime:"10:10 AM",lat:13.0405,lng:80.2337}],dailyPassengers:2400,occupancyStats:{peak:"94%",avg:"68%"}},{number:"23C",name:"Thiruvanmiyur Fast Route",source:"Mylapore Temple",destination:"Thiruvanmiyur",stops:[{name:"Mylapore Temple",distance:0,scheduledTime:"09:45 AM",lat:13.033,lng:80.269},{name:"Mandaveli",distance:1.8,scheduledTime:"09:52 AM",lat:13.0232,lng:80.2625},{name:"Adyar Depot",distance:4.5,scheduledTime:"10:05 AM",lat:13.0064,lng:80.2577},{name:"Thiruvanmiyur",distance:7.2,scheduledTime:12.983,lng:80.2516}],dailyPassengers:1800,occupancyStats:{peak:"76%",avg:"48%"}},{number:"M70",name:"Broadway Special Route",source:"Guindy Estate",destination:"Broadway",stops:[{name:"Guindy Estate",distance:0,scheduledTime:"09:10 AM",lat:13.0084,lng:80.2131},{name:"Teynampet",distance:5.2,scheduledTime:"09:25 AM",lat:13.034,lng:80.244},{name:"Gemini Flyover",distance:6.8,scheduledTime:"09:32 AM",lat:13.0425,lng:80.2514},{name:"LIC",distance:9.5,scheduledTime:"09:45 AM",lat:13.061,lng:80.264},{name:"Broadway",distance:13,scheduledTime:"10:00 AM",lat:13.088,lng:80.288}],dailyPassengers:3100,occupancyStats:{peak:"88%",avg:"62%"}},{number:"102",name:"Kelambakkam Local Route",source:"Adyar Depot",destination:"Kelambakkam",stops:[{name:"Adyar Depot",distance:0,scheduledTime:"09:20 AM",lat:13.0064,lng:80.2577},{name:"Taramani",distance:4.8,scheduledTime:"09:35 AM",lat:12.9782,lng:80.2418},{name:"Tidel Park",distance:6.1,scheduledTime:"09:40 AM",lat:12.9894,lng:80.2505},{name:"Sholinganallur",distance:14.5,scheduledTime:"10:05 AM",lat:12.901,lng:80.2269},{name:"Kelambakkam",distance:28,scheduledTime:"10:35 AM",lat:12.785,lng:80.223}],dailyPassengers:1500,occupancyStats:{peak:"71%",avg:"42%"}}],le=[{id:"ESP32-047A",busId:"47A",status:"Online",lastComm:"Just now",fwVersion:"v1.4.2",rssi:"-58 dBm",heap:"182 KB",temperature:"41.5 °C"},{id:"ESP32-019B",busId:"19B",status:"Online",lastComm:"Just now",fwVersion:"v1.4.2",rssi:"-64 dBm",heap:"179 KB",temperature:"43.2 °C"},{id:"ESP32-023C",busId:"23C",status:"Online",lastComm:"Just now",fwVersion:"v1.4.2",rssi:"-55 dBm",heap:"185 KB",temperature:"39.8 °C"},{id:"ESP32-0M70",busId:"M70",status:"Offline",lastComm:"28 mins ago",fwVersion:"v1.3.9",rssi:"N/A",heap:"0 KB",temperature:"N/A"},{id:"ESP32-0102",busId:"102",status:"Maintenance",lastComm:"4 mins ago",fwVersion:"v1.4.2",rssi:"-82 dBm",heap:"155 KB",temperature:"48.1 °C"},{id:"ESP32-0570",busId:"570",status:"Fault",lastComm:"12 hours ago",fwVersion:"v1.3.1",rssi:"N/A",heap:"0 KB",temperature:"N/A"}],re=[{id:"a1",type:"High Occupancy",title:"Bus 19B Overcrowded",desc:"Route 19B occupancy reached 93% (56/60 passengers) near Nandanam.",busId:"19B",priority:"High",status:"Unread",time:"5 mins ago"},{id:"a2",type:"Device Offline",title:"IoT Node ESP32-0M70 Disconnected",desc:"Bus M70 device heartbeat timeout. Last reported ping -72dBm.",busId:"M70",priority:"Critical",status:"Unread",time:"28 mins ago"},{id:"a3",type:"Route Delay",title:"Route 47A Major Delay",desc:"Vellore Express is running 15 minutes behind schedule due to traffic congestion.",busId:"47A",priority:"Medium",status:"Unread",time:"42 mins ago"},{id:"a4",type:"Sensor Failure",title:"Bus 102 Passenger Counter Error",desc:"ESP32-0102 door-beam sensor reported inconsistent count. Pin D5 low.",busId:"102",priority:"High",status:"Unread",time:"1 hour ago"},{id:"a5",type:"System Notification",title:"System Overload Warning",desc:"Central database prediction engine CPU utilization exceeded 90% for 5m.",busId:"",priority:"Low",status:"Unread",time:"2 hours ago"},{id:"a6",type:"Bus Delay",title:"Bus 23C minor delay",desc:"Thiruvanmiyur Fast running 5 mins late due to temple festival crowd near Mylapore.",busId:"23C",priority:"Low",status:"Read",time:"4 hours ago"}],de=[{id:"u1",name:"Anand Selvam",email:"anand.s@crowdsense.tn.gov",role:"Super Admin",status:"Active"},{id:"u2",name:"Priya Murthy",email:"priya.m@crowdsense.tn.gov",role:"Transport Officer",status:"Active"},{id:"u3",name:"Karthik Raja",email:"karthik.r@crowdsense.tn.gov",role:"Route Manager",status:"Active"},{id:"u4",name:"Deepak Kumar",email:"deepak.k@crowdsense.tn.gov",role:"Operations Manager",status:"Active"}],ce={highOccupancyThreshold:75,criticalOccupancyThreshold:90,gpsPollingInterval:3,offlineTimeout:60,alertEmailNotif:!0,alertSmsNotif:!1,alertPushNotif:!0,autoRefreshDashboard:!0},ue=[{id:"act1",title:"Bus Route Assigned",desc:"Transport Officer Priya assigned Route 47A to Bus TN-23-N-4512.",time:"10 mins ago"},{id:"act2",title:"IoT Device Configured",desc:"Super Admin updated configuration parameters for ESP32-019B.",time:"1 hour ago"},{id:"act3",title:"New Route Created",desc:"Route Manager Karthik added Route 570 - Koyambedu to Siruseri IT Park.",time:"4 hours ago"},{id:"act4",title:"Settings Modified",desc:"Super Admin modified High Occupancy alert threshold to 75%.",time:"1 day ago"}],v={init(){localStorage.getItem(m.BUSES)||localStorage.setItem(m.BUSES,JSON.stringify(ne)),localStorage.getItem(m.ROUTES)||localStorage.setItem(m.ROUTES,JSON.stringify(oe)),localStorage.getItem(m.DEVICES)||localStorage.setItem(m.DEVICES,JSON.stringify(le)),localStorage.getItem(m.ALERTS)||localStorage.setItem(m.ALERTS,JSON.stringify(re)),localStorage.getItem(m.USERS)||localStorage.setItem(m.USERS,JSON.stringify(de)),localStorage.getItem(m.SETTINGS)||localStorage.setItem(m.SETTINGS,JSON.stringify(ce)),localStorage.getItem(m.ACTIVITIES)||localStorage.setItem(m.ACTIVITIES,JSON.stringify(ue))},getItem(t){const e=localStorage.getItem(t);return e?JSON.parse(e):null},setItem(t,e){localStorage.setItem(t,JSON.stringify(e)),typeof window<"u"&&window.dispatchEvent(new CustomEvent("crowdsense_store_updated",{detail:{key:t}}))}},B={getAllBuses(){return v.getItem(m.BUSES)||[]},getBusDetails(t){return this.getAllBuses().find(a=>a.id===t)||null},getNearbyBuses(){return this.getAllBuses().filter(e=>e.status==="Active").slice(0,4)},addBus(t){const e=this.getAllBuses();e.push(t),v.setItem(m.BUSES,e)},updateBus(t,e){const a=this.getAllBuses(),s=a.findIndex(i=>i.id===t);s!==-1&&(a[s]={...a[s],...e},v.setItem(m.BUSES,a))},deleteBus(t){let e=this.getAllBuses();e=e.filter(a=>a.id!==t),v.setItem(m.BUSES,e)}},z={getAllRoutes(){return v.getItem(m.ROUTES)||[]},getRouteDetails(t){return this.getAllRoutes().find(a=>a.number===t)||null},getAllStops(){const t=this.getAllRoutes(),e=new Set;return t.forEach(a=>{a.stops.forEach(s=>e.add(s.name))}),Array.from(e).sort()},addRoute(t){const e=this.getAllRoutes();e.push(t),v.setItem(m.ROUTES,e)},updateRoute(t,e){const a=this.getAllRoutes(),s=a.findIndex(i=>i.number===t);s!==-1&&(a[s]={...a[s],...e},v.setItem(m.ROUTES,a))},deleteRoute(t){let e=this.getAllRoutes();e=e.filter(a=>a.number!==t),v.setItem(m.ROUTES,e)},searchRoutes(t,e){if(!t||!e)return[];const a=t.trim().toLowerCase(),s=e.trim().toLowerCase(),i=this.getAllRoutes(),n=[];return i.forEach(o=>{let r=-1,l=-1;for(let c=0;c<o.stops.length;c++){const p=o.stops[c].name.toLowerCase();if(p.includes(a)&&r===-1&&(r=c),p.includes(s)&&r!==-1&&c>r){l=c;break}}if(r!==-1&&l!==-1){const c=o.stops[r],p=o.stops[l],u=p.distance-c.distance,g=l-r,f=Math.round(u*2.5+g),w=(v.getItem(m.BUSES)||[]).find(C=>C.id===o.number)||{id:o.number,name:o.name,type:"City",stops:o.stops};n.push({bus:w,boardStop:c.name,alightStop:p.name,sourceIndex:r,destIndex:l,distance:parseFloat(u.toFixed(1)),duration:f,stopsCount:g})}}),n}},D={getDevices(){return v.getItem(m.DEVICES)||[]},getDeviceDetails(t){return this.getDevices().find(a=>a.id===t)||null},addDevice(t){const e=this.getDevices();e.push(t),v.setItem(m.DEVICES,e)},updateDevice(t,e){const a=this.getDevices(),s=a.findIndex(i=>i.id===t);s!==-1&&(a[s]={...a[s],...e},v.setItem(m.DEVICES,a))},deleteDevice(t){let e=this.getDevices();e=e.filter(a=>a.id!==t),v.setItem(m.DEVICES,e)}},$={getAlerts(){return v.getItem(m.ALERTS)||[]},createAlert(t){const e=this.getAlerts(),a={id:"a_"+Date.now(),status:"Unread",time:"Just now",...t};e.unshift(a),v.setItem(m.ALERTS,e)},markAlertAsRead(t){const e=this.getAlerts(),a=e.findIndex(s=>s.id===t);a!==-1&&(e[a].status="Read",v.setItem(m.ALERTS,e))},markAllAlertsAsRead(){const t=this.getAlerts();t.forEach(e=>e.status="Read"),v.setItem(m.ALERTS,t)},archiveAlert(t){let e=this.getAlerts();e=e.filter(a=>a.id!==t),v.setItem(m.ALERTS,e)},getActivities(){return v.getItem(m.ACTIVITIES)||[]},addActivity(t,e){const a=this.getActivities();a.unshift({id:"act_"+Date.now(),title:t,desc:e,time:"Just now"});const s=a.slice(0,30);v.setItem(m.ACTIVITIES,s)},getCustomerAlerts(){return this.getAlerts().map(e=>{let a="updates",s="General Updates",i="info",n="border-primary",o="bg-primary-fixed",r="text-primary";const l=e.priority||"Low";return e.type==="High Occupancy"||e.type==="Overcrowding"?(a="critical",s="Heavy Crowd Alerts",i="groups",n="border-error",o="bg-error-container",r="text-error"):e.type==="Route Delay"||e.type==="Bus Delay"||l==="High"||l==="Critical"?(a="diversions",s="Service Disruptions",i="warning",n="border-tertiary",o="bg-tertiary-fixed",r="text-tertiary"):e.type==="Device Offline"||e.type==="Sensor Failure"?(a="updates",s="Telemetry Maintenance",i="settings_suggest",n="border-[#5c647a]",o="bg-slate-100",r="text-[#5c647a]"):l==="Low"&&(a="updates",s="Route Status Clear",i="check_circle",n="border-[#008a4f]",o="bg-green-100",r="text-[#008a4f]"),{id:e.id,type:a,categoryLabel:s,timeAgo:e.time||"Just now",title:e.title,description:e.desc,affectedRoutes:e.busId?[`Route ${e.busId}`]:["System Wide"],icon:i,colorClass:n,bgClass:o,textClass:r}})}};let x={},h={};const M={};function pe(){B.getAllBuses().forEach((e,a)=>{const s=15+a*15;x[e.id]={busId:e.id,progress:s,speed:e.status==="Active"?35+Math.floor(Math.random()*20):0,currentStop:e.source,nextStop:e.destination,eta:e.status==="Active"?12+a*3:0,lat:13.0064,lng:80.2577,health:e.status==="Active"?"Good":"Disconnected",lastUpdated:new Date};let i=10+Math.floor(Math.random()*(e.capacity-15));e.id==="19B"&&(i=56),e.id==="47A"&&(i=42),e.id==="23C"&&(i=18),h[e.id]={busId:e.id,passengers:i,capacity:e.capacity,percentage:Math.round(i/e.capacity*100),lastUpdated:new Date},X(e.id)}),v.setItem(m.TRACKING,x),v.setItem(m.OCCUPANCY,h)}function X(t){const e=B.getAllBuses().find(S=>S.id===t),a=z.getAllRoutes().find(S=>S.number===t),s=x[t],i=h[t];if(!e||!s||!i)return;if(e.status!=="Active"){s.speed=0,s.eta=0;return}const n=a?a.stops:[];if(n.length===0)return;const o=n[n.length-1].distance,r=s.progress/100*o;let l=0;for(let S=0;S<n.length&&n[S].distance<=r;S++)l=S;const c=Math.min(l+1,n.length-1),p=n[l],u=n[c];let g=0;l===n.length-1?g=0:g=u.distance-r;const f=Math.random()*8-4;s.speed=Math.max(10,Math.min(60,Math.round(s.speed+f)));let b=0;g>0&&s.speed>0&&(b=Math.ceil(g/s.speed*60)),s.currentStop=p.name,s.nextStop=u.name,s.distanceToNext=parseFloat(g.toFixed(1)),s.eta=l===n.length-1?0:b,s.lastStopIndex=l,s.nextStopIndex=c;let w=p.lat,C=p.lng;if(l!==c){const S=u.distance-p.distance,A=S>0?(r-p.distance)/S:0;w=p.lat+(u.lat-p.lat)*A,C=p.lng+(u.lng-p.lng)*A}s.lat=parseFloat(w.toFixed(6)),s.lng=parseFloat(C.toFixed(6))}function me(){setInterval(()=>{B.getAllBuses().forEach(s=>{if(s.status!=="Active")return;const i=x[s.id],n=h[s.id];if(!(!i||!n)){if(i.progress+=.4+Math.random()*.4,i.progress>=100&&(i.progress=0),i.lastUpdated=new Date,Math.random()<.3){const o=Math.floor(Math.random()*5)-2;n.passengers=Math.max(5,Math.min(n.capacity,n.passengers+o)),n.percentage=Math.round(n.passengers/n.capacity*100);const r=d.getSettings();n.percentage>=r.highOccupancyThreshold&&($.getAlerts().some(c=>c.busId===s.id&&c.type==="High Occupancy"&&c.status==="Unread")||$.createAlert({type:"High Occupancy",title:`Bus ${s.id} High Occupancy Detected`,desc:`Bus ${s.id} passenger counts reached ${n.percentage}% capacity (${n.passengers}/${n.capacity} passengers).`,busId:s.id,priority:n.percentage>=r.criticalOccupancyThreshold?"Critical":"High"}))}X(s.id)}});const e=D.getDevices();let a=!1;e.forEach(s=>{if(Math.random()<.02){const i=["Online","Online","Online","Offline","Maintenance","Fault"],n=i[Math.floor(Math.random()*i.length)];s.status!==n&&(s.status=n,s.lastComm=n==="Online"?"Just now":"5 mins ago",n==="Online"?(s.rssi="-60 dBm",s.heap="180 KB",s.temperature="40.5 °C"):(s.rssi="N/A",s.heap="0 KB",s.temperature="N/A"),a=!0,(n==="Offline"||n==="Fault")&&$.createAlert({type:n==="Offline"?"Device Offline":"Sensor Failure",title:`ESP32 Node ${s.id} is ${n}`,desc:`Device status changed to ${n}. Bus ${s.busId||"N/A"} telemetry lost.`,busId:s.busId,priority:n==="Offline"?"Critical":"High"}))}}),a&&D.saveDevices(e),v.setItem(m.TRACKING,x),v.setItem(m.OCCUPANCY,h),H()},4e3)}function H(){Object.keys(M).forEach(t=>{M[t].forEach(e=>{try{e({buses:B.getAllBuses(),routes:z.getAllRoutes(),devices:D.getDevices(),alerts:$.getAlerts(),tracking:x,occupancy:h})}catch(a){console.error("Listener error:",a)}})})}const d={init(){v.init();const t=v.getItem(m.TRACKING),e=v.getItem(m.OCCUPANCY);t&&(x=t),e&&(h=e),(!t||!e)&&pe(),me()},getBuses(){return B.getAllBuses()},saveBuses(t){v.setItem(m.BUSES,t),H()},addBus(t){B.addBus(t),x[t.id]={busId:t.id,progress:0,speed:0,currentStop:t.source,nextStop:t.destination,eta:0,lat:13.0064,lng:80.2577,health:"Disconnected",lastUpdated:new Date},h[t.id]={busId:t.id,passengers:0,capacity:t.capacity,percentage:0,lastUpdated:new Date},X(t.id),v.setItem(m.TRACKING,x),v.setItem(m.OCCUPANCY,h),this.addActivity("Bus Added",`New bus ${t.id} (${t.number}) registered in fleet database.`)},updateBus(t,e){B.updateBus(t,e);const a=B.getBusDetails(t);a&&(x[t]&&(x[t].currentStop=a.source,x[t].nextStop=a.destination,x[t].lastUpdated=new Date,X(t)),h[t]&&(h[t].capacity=a.capacity,h[t].percentage=Math.round(h[t].passengers/h[t].capacity*100),h[t].lastUpdated=new Date),v.setItem(m.TRACKING,x),v.setItem(m.OCCUPANCY,h)),this.addActivity("Bus Modified",`Metadata for bus ${t} updated by administrator.`)},deleteBus(t){B.deleteBus(t),delete x[t],delete h[t],v.setItem(m.TRACKING,x),v.setItem(m.OCCUPANCY,h),this.addActivity("Bus Disabled/Removed",`Bus ${t} was decommissioned from the fleet.`)},getRoutes(){return z.getAllRoutes()},saveRoutes(t){v.setItem(m.ROUTES,t),H()},addRoute(t){z.addRoute(t),this.addActivity("Route Created",`Route ${t.number} (${t.source} to ${t.destination}) created.`)},updateRoute(t,e){z.updateRoute(t,e),this.addActivity("Route Updated",`Route details and stops modified for Route ${t}.`)},deleteRoute(t){z.deleteRoute(t),this.addActivity("Route Deleted",`Route ${t} has been deleted from active database.`)},getDevices(){return D.getDevices()},saveDevices(t){D.saveDevices(t)},addDevice(t){D.addDevice(t),this.addActivity("Device Registered",`New ESP32 IoT node ${t.id} provisioned.`)},updateDevice(t,e){D.updateDevice(t,e)},deleteDevice(t){D.deleteDevice(t),this.addActivity("Device Removed",`ESP32 Node ${t} de-registered.`)},getAlerts(){return $.getAlerts()},saveAlerts(t){v.setItem(m.ALERTS,t),H()},createAlert(t){$.createAlert(t)},markAlertAsRead(t){$.markAlertAsRead(t)},markAllAlertsAsRead(){$.markAllAlertsAsRead()},archiveAlert(t){$.archiveAlert(t)},getUsers(){return v.getItem(m.USERS)||[]},saveUsers(t){v.setItem(m.USERS,t),H()},addUser(t){const e=this.getUsers(),a={id:"u_"+Date.now(),status:"Active",...t};e.push(a),this.saveUsers(e),this.addActivity("User Registered",`Admin profile for ${t.name} created as ${t.role}.`)},updateUser(t,e){const a=this.getUsers(),s=a.findIndex(i=>i.id===t);s!==-1&&(a[s]={...a[s],...e},this.saveUsers(a))},deleteUser(t){const e=this.getUsers(),a=e.find(i=>i.id===t);let s=e.filter(i=>i.id!==t);this.saveUsers(s),a&&this.addActivity("User Deleted",`Admin staff ${a.name} has been removed.`)},getSettings(){const t={highOccupancyThreshold:75,criticalOccupancyThreshold:90,gpsPollingInterval:3,offlineTimeout:60,alertEmailNotif:!0,alertSmsNotif:!1,alertPushNotif:!0,autoRefreshDashboard:!0};return v.getItem(m.SETTINGS)||t},saveSettings(t){v.setItem(m.SETTINGS,t),H()},getActivities(){return $.getActivities()},addActivity(t,e){$.addActivity(t,e)},getLiveState(){return{tracking:x,occupancy:h}},subscribe(t,e){M[t]||(M[t]=[]),M[t].push(e),e({buses:this.getBuses(),routes:this.getRoutes(),devices:this.getDevices(),alerts:this.getAlerts(),tracking:x,occupancy:h})},unsubscribe(t,e){M[t]&&(M[t]=M[t].filter(a=>a!==e))}},ve={render(){return`
      <div class="loading-page-container">
        <!-- Top Spacer for vertical balance -->
        <div class="top-spacer"></div>
        
        <!-- Central Focal Point -->
        <main class="fade-in">
          <!-- Logo & Tagline Container -->
          <div class="logo-container">
            <img class="logo-img" src="/logo_with_tagline.png" alt="CrowdSense TN Logo with Tagline" />
          </div>
          
          <p class="version-tag">
            CrowdSense TN Transit System v4.2
          </p>
          
          <!-- Progress Indicator -->
          <div class="progress-container">
            <div class="progress-info">
              <span class="status-text" id="loading-status">Initializing Systems</span>
              <span class="percent-text" id="percent">0%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar shimmer-effect" id="progress-bar" style="width: 0%"></div>
            </div>
          </div>
        </main>
        
        <!-- Footer Branding -->
        <footer class="fade-in" style="animation-delay: 0.2s;">
          <div class="footer-divider"></div>
          <div class="footer-brand">
            <p class="dept-label">
              Department of Transport
            </p>
            <div class="govt-title">
              <span class="material-symbols-outlined" style="color: var(--color-primary); font-variation-settings: 'FILL' 1; font-size: 20px;">account_balance</span>
              <h2 class="govt-name">
                Government of Tamil Nadu
              </h2>
            </div>
          </div>
          <div class="dots-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </footer>
      </div>
    `},mount(){const t=document.getElementById("progress-bar"),e=document.getElementById("percent"),a=document.getElementById("loading-status");if(!t||!e||!a)return;const s=[{threshold:20,label:"Connecting to Satellite..."},{threshold:45,label:"Fetching Transit Data..."},{threshold:70,label:"Optimizing Route Matrices..."},{threshold:90,label:"Synchronizing Dashboards..."},{threshold:100,label:"System Ready"}];let i=0,n=null;function o(){if(i<100){i+=Math.floor(Math.random()*10)+2,i>100&&(i=100),t.style.width=`${i}%`,e.innerText=`${i}%`;const r=s.find(l=>i<=l.threshold)||s[s.length-1];a.innerText=r.label,n=setTimeout(o,Math.random()*200+80)}else a.style.color="var(--color-success)",n=setTimeout(()=>{const r=sessionStorage.getItem("redirect_target");sessionStorage.removeItem("redirect_target"),window.location.hash=r||"#/dashboard"},600)}o(),this._timeoutId=n},unmount(){this._timeoutId&&clearTimeout(this._timeoutId)}},E={mapInstance:null,busMarkers:{},animMarkers:{},animationFrameId:null,init(t,e=[13.0064,80.2577],a=12){if(typeof window.L>"u")return console.error("Leaflet.js library is not loaded."),null;const s=window.L;return this.mapInstance=s.map(t,{zoomControl:!0,scrollWheelZoom:!0,attributionControl:!1}).setView(e,a),s.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(this.mapInstance),this.startGlidesLoop(),this.mapInstance},createBusIcon(t){const e=t==="19B"?"var(--color-primary)":"var(--color-primary-light)";return window.L.divIcon({className:"custom-bus-marker-icon",html:`
        <div class="relative flex flex-col items-center select-none" style="transform: translate(-20px, -20px); width: 40px; height: 40px; display: flex; flex-direction: column; align-items: center;">
          <div style="background: ${e}; padding: 8px; border-radius: 50%; box-shadow: var(--shadow-md); border: 2px solid white; display: flex; align-items: center; justify-content: center;" class="pulse-live">
            <span class="material-symbols-outlined text-white text-[14px]" style="font-size: 14px; color: white; font-variation-settings: 'FILL' 1;">directions_bus</span>
          </div>
          <div style="margin-top: 4px; padding: 2px 6px; background: rgba(255,255,255,0.95); border-radius: 9999px; border: 1px solid rgba(195,198,215,0.4); box-shadow: var(--shadow-sm);">
            <span class="font-label-caps text-[8px] font-bold text-primary" style="font-size: 8px; font-weight: 700; color: var(--color-primary);">${t}</span>
          </div>
        </div>
      `,iconSize:[40,40],iconAnchor:[20,20]})},updateMarkers(t,e){if(!this.mapInstance)return;const a=window.L;Object.keys(t).forEach(s=>{const i=t[s];if(i)if(this.busMarkers[s]){const n=this.animMarkers[s];n&&(n.startLat=n.currentLat,n.startLng=n.currentLng,n.targetLat=i.lat,n.targetLng=i.lng,n.startTime=performance.now())}else{const n=a.marker([i.lat,i.lng],{icon:this.createBusIcon(s)}).addTo(this.mapInstance);this.busMarkers[s]=n,this.animMarkers[s]={startLat:i.lat,startLng:i.lng,currentLat:i.lat,currentLng:i.lng,targetLat:i.lat,targetLng:i.lng,startTime:performance.now(),duration:3e3}}})},drawRoutes(t){if(!this.mapInstance)return;const e=window.L;t.forEach(a=>{const s=a.stops.map(n=>[n.lat,n.lng]);let i="#0057B8";a.number==="19B"?i="#00A8E8":a.number==="23C"?i="#22C55E":a.number==="M70"&&(i="#EF4444"),e.polyline(s,{color:i,weight:4,opacity:.7,lineJoin:"round"}).addTo(this.mapInstance)})},startGlidesLoop(){const t=e=>{Object.keys(this.busMarkers).forEach(a=>{const s=this.busMarkers[a],i=this.animMarkers[a];if(!s||!i)return;const n=e-i.startTime,o=Math.min(n/i.duration,1);if(i.startLat!==void 0){const r=i.startLat+(i.targetLat-i.startLat)*o,l=i.startLng+(i.targetLng-i.startLng)*o;i.currentLat=r,i.currentLng=l,s.setLatLng([r,l])}else i.currentLat=i.targetLat,i.currentLng=i.targetLng,s.setLatLng([i.targetLat,i.targetLng])}),this.animationFrameId=requestAnimationFrame(t)};this.animationFrameId=requestAnimationFrame(t)},destroy(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.mapInstance&&(this.mapInstance.remove(),this.mapInstance=null),this.busMarkers={},this.animMarkers={}}},ee={getBadgeDetails(t){let e="Low Crowd",a="status-chip-low",s="#22c55e";return t>40&&t<=75?(e="Medium Crowd",a="status-chip-medium",s="#eab308"):t>75&&(e="High Crowd",a="status-chip-high",s="#ef4444"),{label:e,chipClass:a,color:s}},render(t){const{label:e,chipClass:a}=this.getBadgeDetails(t);return`
      <span class="${a} px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-wide" style="display: inline-flex; border-radius: 9999px; font-weight: 700; text-transform: uppercase; font-size: 10px; padding: 4px 10px; border: 1px solid;">
        <span class="material-symbols-outlined text-[14px]" style="font-size: 14px; font-variation-settings: 'FILL' 1;">groups</span>
        ${e}
      </span>
    `}},ge={render(t){return`
      <div class="text-right flex flex-col items-end flex-shrink-0" style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
        <span class="font-bold text-primary text-base md:text-lg leading-none" style="font-weight: 700; color: var(--color-primary); font-size: 16px; line-height: 1;">${t||0} min</span>
        <span class="text-[9px] md:text-[10px] text-outline uppercase font-semibold mt-1" style="font-size: 9px; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; margin-top: 4px;">ETA</span>
      </div>
    `}},fe={getBadgeColors(t){return t.type==="Express"?"background: var(--color-primary); color: white;":t.type==="Local"?"background: rgba(115, 118, 134, 0.2); color: var(--color-text-primary);":t.type==="Fast"?"background: rgba(0, 87, 184, 0.8); color: white;":"background: var(--color-surface-container-high); color: var(--color-primary);"},render(t,e,a){const s=this.getBadgeColors(t),i=e?e.eta:10,n=e?e.currentStop:t.stops[0].name,o=a?a.percentage:30;return`
      <div data-bus-id="${t.id}" class="bus-card-item glass-card p-3.5 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 transition-all hover:bg-white/90 active:scale-[0.99] cursor-pointer group relative overflow-hidden" style="background: rgba(255,255,255,0.75); border: 1px solid var(--color-border-subtle); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; box-shadow: var(--shadow-sm); cursor: pointer;">
        <!-- Route Badge -->
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0 font-sans" style="${s} width: 52px; height: 52px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">
          <span class="text-lg md:text-xl font-bold leading-tight" style="font-size: 18px; font-weight: 700; line-height: 1.1;">${t.id}</span>
          <span class="text-[8px] md:text-[9px] font-semibold uppercase tracking-tighter" style="font-size: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${t.type}</span>
        </div>
        
        <!-- Details Content -->
        <div class="flex-1 min-w-0" style="flex: 1; min-width: 0;">
          <div class="flex justify-between items-start mb-1 gap-2" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <h3 class="text-base md:text-title-lg truncate pr-1 font-semibold text-on-surface" style="font-size: 15px; font-weight: 600; margin:0; color: var(--color-text-primary); text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 140px;">${t.name}</h3>
            ${ge.render(i)}
          </div>
          
          <div class="flex items-center gap-1.5 mb-2" style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
            <span class="material-symbols-outlined text-outline text-sm md:text-base" style="font-size: 16px; color: var(--color-text-muted);">location_on</span>
            <p class="font-body-sm text-xs md:text-body-sm text-on-surface-variant truncate" style="font-size: 12px; color: var(--color-text-secondary); margin:0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Currently at ${n}</p>
          </div>
          
          <div class="flex items-center justify-between gap-2" style="display: flex; align-items: center; justify-content: space-between;">
            <div class="flex flex-wrap items-center gap-1.5 md:gap-3" style="display: flex; align-items: center; gap: 8px;">
              ${ee.render(o)}
              <span class="font-body-sm text-xs md:text-body-sm text-on-surface-variant flex items-center gap-1" style="font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined text-sm md:text-base" style="font-size: 14px;">meeting_room</span>
                ${t.platform||"P1"}
              </span>
            </div>
            
            <div class="flex -space-x-1 opacity-70 flex-shrink-0" style="display: flex; opacity: 0.7; gap: 2px;">
              <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]" style="font-size: 16px; color: var(--color-text-muted);">wifi</span>
              <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]" style="font-size: 16px; color: var(--color-text-muted);">ac_unit</span>
            </div>
          </div>
        </div>
      </div>
    `}};let O=null,N=null;const be={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Command Center Overview</h1>
            <p class="page-subtitle">Real-time IoT transit telemetry and system status.</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-secondary" id="btn-refresh-dashboard">
              <span class="material-symbols-outlined">refresh</span>Refresh
            </button>
            <a href="#/operations" class="btn btn-primary">
              <span class="material-symbols-outlined">radar</span>Launch Live Ops
            </a>
          </div>
        </div>
      </div>

      <!-- Overview Statistics Grid -->
      <div class="stats-grid fade-in fade-in-delay-1" id="stats-container">
        <!-- populated dynamically -->
      </div>

      <!-- Main Columns Grid -->
      <div class="analytics-grid fade-in fade-in-delay-2">
        
        <!-- Live Fleet Map Card -->
        <div class="card flex flex-col" style="min-height: 400px;">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">map</span>Live Fleet Map Trace
            </div>
            <div class="badge badge-success">
              <span class="status-dot pulse-green" style="margin-right:4px;"></span>Live Tracking
            </div>
          </div>
          <div class="card-body-flush" style="position:relative; flex: 1; min-height: 340px;">
            <!-- Live Leaflet tracking component -->
            <div id="dashboard-map" style="width: 100%; height: 100%; min-height: 340px; z-index: 1;"></div>
          </div>
        </div>

        <!-- Recent Activities Feed -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">list_alt</span>Recent Activity
            </div>
            <a href="#/settings" class="btn-icon" title="Configure Logs"><span class="material-symbols-outlined">settings</span></a>
          </div>
          <div class="card-body" id="activity-feed-container" style="max-height: 340px; overflow-y: auto;">
            <!-- populated dynamically -->
          </div>
        </div>
      </div>

      <!-- Highlighted Fleet Cards (Reused Customer Bus Cards) -->
      <div class="card mb-4 fade-in fade-in-delay-3">
        <div class="card-header">
          <div class="card-title"><span class="material-symbols-outlined">directions_bus</span>Live Fleet Occupancy Overview</div>
          <a href="#/buses" class="btn btn-secondary btn-sm">Configure Vehicles</a>
        </div>
        <div class="card-body">
          <div class="grid-3" id="live-fleet-cards-container">
            <!-- Rendered exactly like Customer Homepage cards -->
          </div>
        </div>
      </div>

      <!-- Bottom Charts Row -->
      <div class="grid-2 fade-in fade-in-delay-4">
        <!-- Passenger Load Chart -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">analytics</span>Passenger Load Curve (Today)
            </div>
            <div class="card-actions">
              <span class="badge badge-primary">Hourly Aggregate</span>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-wrap">
              <canvas id="passenger-load-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Device Status breakdown -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">memory</span>IoT Device Nodes
            </div>
            <a href="#/devices" class="btn btn-secondary btn-sm">Manage Hardware</a>
          </div>
          <div class="card-body">
            <div class="grid-2" style="align-items: center;">
              <div class="chart-wrap-sm">
                <canvas id="device-donut-chart"></canvas>
              </div>
              <div class="flex flex-col gap-3" id="device-summary-list">
                <!-- Dynamic device summary list -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `},mount(){var t;E.init("dashboard-map",[13.0064,80.2577],11),E.drawRoutes(d.getRoutes()),(t=document.getElementById("btn-refresh-dashboard"))==null||t.addEventListener("click",()=>{d.init(),this.updateUI()}),O=e=>{this.renderStats(e),this.renderActivities(e),this.renderDeviceBreakdown(e),this.updateLoadChart(e),E.updateMarkers(e.tracking,e.occupancy),this.renderFleetCards(e)},d.subscribe("dashboard",O),this.initLoadChart()},unmount(){O&&(d.unsubscribe("dashboard",O),O=null),N&&(N.destroy(),N=null),E.destroy()},updateUI(){const t={buses:d.getBuses(),routes:d.getRoutes(),devices:d.getDevices(),alerts:d.getAlerts(),tracking:d.getLiveState().tracking,occupancy:d.getLiveState().occupancy};O(t)},renderFleetCards(t){const e=document.getElementById("live-fleet-cards-container");if(!e)return;const a=t.buses.filter(s=>s.status==="Active").slice(0,3);if(a.length===0){e.innerHTML='<div class="text-muted text-sm">No active buses to display.</div>';return}e.innerHTML=a.map(s=>{const i=t.tracking[s.id],n=t.occupancy[s.id];return fe.render(s,i,n)}).join(""),e.querySelectorAll("[data-bus-id]").forEach(s=>{s.addEventListener("click",()=>{const i=s.getAttribute("data-bus-id");window.location.hash=`#/operations?id=${i}`})})},renderStats(t){const e=document.getElementById("stats-container");if(!e)return;const a=t.buses.length,s=t.buses.filter(u=>u.status==="Active").length,i=t.routes.length,n=t.devices.filter(u=>u.status==="Online").length;let o=0,r=0,l=0;Object.keys(t.occupancy).forEach(u=>{const g=t.occupancy[u],f=t.buses.find(b=>b.id===u);f&&f.status==="Active"&&(o+=g.passengers,r+=g.percentage,l++)});const c=l>0?Math.round(r/l):0,p=t.alerts.length;e.innerHTML=`
      <div class="stat-card accent-primary">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">directions_bus</span></div>
        <div class="stat-label">Active Buses</div>
        <div class="stat-value">${s}/${a}</div>
        <div class="stat-trend up">
          <span class="material-symbols-outlined text-sm">check_circle</span>
          <span>${Math.round(s/a*100)}% Fleet Active</span>
        </div>
      </div>

      <div class="stat-card accent-secondary">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">route</span></div>
        <div class="stat-label">Active Routes</div>
        <div class="stat-value">${i}</div>
        <div class="stat-trend neutral">
          <span class="material-symbols-outlined text-sm">hub</span>
          <span>Inter-city Grid</span>
        </div>
      </div>

      <div class="stat-card accent-success">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">memory</span></div>
        <div class="stat-label">Online Devices</div>
        <div class="stat-value">${n}/${t.devices.length}</div>
        <div class="stat-trend up">
          <span class="material-symbols-outlined text-sm">wifi</span>
          <span>${Math.round(n/t.devices.length*100)}% Online</span>
        </div>
      </div>

      <div class="stat-card accent-primary">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">groups</span></div>
        <div class="stat-label">Current Passengers</div>
        <div class="stat-value">${o}</div>
        <div class="stat-trend up">
          <span class="material-symbols-outlined text-sm">trending_up</span>
          <span>Live Boarding</span>
        </div>
      </div>

      <div class="stat-card accent-warning">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">analytics</span></div>
        <div class="stat-label">Average Occupancy</div>
        <div class="stat-value">${c}%</div>
        <div class="stat-trend ${c>75?"down":"up"}">
          <span class="material-symbols-outlined text-sm">${c>75?"warning":"check_circle"}</span>
          <span>${c>75?"Overloaded":"Optimal"} Load</span>
        </div>
      </div>

      <div class="stat-card accent-danger">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">notifications_active</span></div>
        <div class="stat-label">Alerts Today</div>
        <div class="stat-value">${p}</div>
        <div class="stat-trend down">
          <span class="material-symbols-outlined text-sm">error</span>
          <span>Unresolved Alerts</span>
        </div>
      </div>
    `},renderActivities(t){const e=document.getElementById("activity-feed-container");if(!e)return;const a=d.getActivities();if(a.length===0){e.innerHTML=`
        <div class="text-muted text-sm" style="padding:20px; text-align:center">No recent activities log.</div>
      `;return}e.innerHTML=a.map(s=>{let i="info",n="bg-primary-subtle text-primary-color";return s.title.includes("Created")||s.title.includes("Added")?(i="add_box",n="badge-success"):s.title.includes("Deleted")||s.title.includes("Removed")?(i="delete_sweep",n="badge-danger"):(s.title.includes("Modified")||s.title.includes("Updated"))&&(i="edit",n="badge-warning"),`
        <div class="activity-item">
          <div class="activity-icon ${n}">
            <span class="material-symbols-outlined">${i}</span>
          </div>
          <div class="activity-text">
            <div class="activity-main">${s.title}</div>
            <div class="activity-sub">${s.desc}</div>
          </div>
          <div class="activity-time">${s.time}</div>
        </div>
      `}).join("")},renderDeviceBreakdown(t){const e=document.getElementById("device-summary-list");if(!e)return;const a=t.devices,s=a.filter(l=>l.status==="Online").length,i=a.filter(l=>l.status==="Offline").length,n=a.filter(l=>l.status==="Maintenance").length,o=a.filter(l=>l.status==="Fault").length;e.innerHTML=`
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#22c55e;"></span>Online Nodes
        </span>
        <span class="font-bold">${s}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#737686;"></span>Offline Nodes
        </span>
        <span class="font-bold">${i}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#f59e0b;"></span>Maintenance
        </span>
        <span class="font-bold">${n}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#ef4444;"></span>Fault Detected
        </span>
        <span class="font-bold">${o}</span>
      </div>
    `;const r=document.getElementById("device-donut-chart");r&&(window.deviceDonutChartInstance&&window.deviceDonutChartInstance.destroy(),window.deviceDonutChartInstance=new Chart(r,{type:"doughnut",data:{labels:["Online","Offline","Maintenance","Fault"],datasets:[{data:[s,i,n,o],backgroundColor:["#22c55e","#737686","#f59e0b","#ef4444"],borderWidth:2,borderColor:"#ffffff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},cutout:"70%"}}))},initLoadChart(){const t=document.getElementById("passenger-load-chart");t&&(N=new Chart(t,{type:"line",data:{labels:["06:00 AM","08:00 AM","10:00 AM","12:00 PM","02:00 PM","04:00 PM","06:00 PM","08:00 PM","10:00 PM"],datasets:[{label:"Current Passengers",data:[120,480,560,310,290,450,680,520,210],borderColor:"#0057B8",backgroundColor:"rgba(0, 87, 184, 0.08)",fill:!0,tension:.4,borderWidth:2,pointRadius:4,pointBackgroundColor:"#0057B8"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1}},y:{grid:{color:"rgba(0,0,0,0.05)"}}}}}))},updateLoadChart(t){if(!N)return;let e=0;Object.keys(t.occupancy).forEach(s=>{const i=t.occupancy[s],n=t.buses.find(o=>o.id===s);n&&n.status==="Active"&&(e+=i.passengers)});const a=N.data.datasets[0].data;a[6]=e,a[7]=Math.round(e*.85),N.update()}},L={show({title:t,bodyHtml:e,footerHtml:a,onClose:s}){const i=document.getElementById("modal-overlay"),n=document.getElementById("modal-container"),o=document.getElementById("modal-title"),r=document.getElementById("modal-body"),l=document.getElementById("modal-footer"),c=document.getElementById("modal-close");if(!i||!n)return;o.textContent=t,r.innerHTML=e,l.innerHTML=a||"",i.classList.remove("hidden"),document.body.style.overflow="hidden";const p=()=>{i.classList.add("hidden"),document.body.style.overflow="",s&&s(),c.removeEventListener("click",p),i.removeEventListener("click",u)},u=g=>{g.target===i&&p()};return c.addEventListener("click",p),i.addEventListener("click",u),{close:p,bodyEl:r,footerEl:l}}},y={show(t,e="info",a=""){const s=document.getElementById("toast-container");if(!s)return;const i=document.createElement("div");i.className=`toast ${e}`;let n="info";e==="success"&&(n="check_circle"),e==="warning"&&(n="warning"),e==="danger"&&(n="error"),i.innerHTML=`
      <span class="material-symbols-outlined toast-icon">${n}</span>
      <div class="toast-message">
        <div>${t}</div>
        ${a?`<div class="toast-sub">${a}</div>`:""}
      </div>
    `,s.appendChild(i),setTimeout(()=>{i.style.animation="slideInToast 0.3s ease reverse forwards",i.addEventListener("animationend",()=>{i.remove()})},4e3)}},ye={renderRadialProgress(t){const e=t!==void 0?t:0;return`
      <div class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0" style="position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-center: center; flex-shrink: 0;">
        <svg class="w-full h-full -rotate-90 radial-progress-svg" style="width: 100%; height: 100%;">
          <circle class="text-surface-container-highest" cx="40" cy="40" fill="transparent" r="36" stroke="var(--color-surface-container-high)" stroke-width="8"></circle>
          <circle id="radial-progress-ring" class="text-primary transition-all duration-700 ease-out" cx="40" cy="40" fill="transparent" r="36" stroke="var(--color-primary)" stroke-dasharray="226.2" stroke-dashoffset="${226.2-e/100*226.2}" stroke-width="8" stroke-linecap="round" style="transition: stroke-dashoffset 0.7s ease-out;"></circle>
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center" style="position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; left:0; top:0; right:0; bottom:0;">
          <span class="font-bold text-base md:text-title-lg text-on-surface font-sans" style="font-weight: 700; font-size: 16px; color: var(--color-text-primary);">${e}%</span>
        </div>
      </div>
    `},render(t,e){const a=e?e.percentage:0,s=e?e.passengers:0,i=t.capacity||60,n=i-s;return`
      <div class="bg-surface-container-high p-4 md:p-6 rounded-xl border border-primary/10 shadow-md flex items-center justify-between gap-4 md:gap-6" style="background: var(--color-surface-container); border: 1px solid var(--color-border-subtle); padding: 20px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: var(--shadow-sm);">
        <div class="flex items-center gap-4" style="display: flex; align-items: center; gap: 16px;">
          ${this.renderRadialProgress(a)}
          <div class="flex flex-col" style="display: flex; flex-direction: column;">
            <span class="text-label-caps font-bold text-primary uppercase tracking-widest mb-1" style="font-size: 10px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Occupancy</span>
            <div id="occupancy-badge-container">
              ${ee.render(a)}
            </div>
          </div>
        </div>
        
        <div class="flex flex-col items-end flex-shrink-0" style="display: flex; flex-direction: column; align-items: flex-end;">
          <div class="flex items-baseline gap-1" style="display: flex; align-items: baseline; gap: 4px;">
            <span class="font-bold text-xl md:text-headline-md text-on-surface" style="font-size: 24px; font-weight: 700; color: var(--color-text-primary);">${s}</span>
            <span class="text-on-surface-variant text-body-sm" style="font-size: 12px; color: var(--color-text-muted);">/ ${i}</span>
          </div>
          <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest" style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.05em; margin-top: 4px;">Passengers</span>
        </div>
      </div>

      <!-- Detailed Crowd / Seats Availability widget -->
      <div class="bg-surface-container rounded-xl p-4 flex items-center justify-between shadow-sm" style="background: var(--color-surface-container); padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-top: 12px; border: 1px solid var(--color-border-subtle);">
        <div class="flex items-center gap-3" style="display: flex; align-items: center; gap: 12px;">
          <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm" style="width: 44px; height: 44px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);">
            <span class="material-symbols-outlined text-primary text-[28px]" style="color: var(--color-primary); font-size: 24px;">airline_seat_recline_normal</span>
          </div>
          <div>
            <h4 class="font-title-lg text-title-lg text-on-surface font-semibold" style="font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin:0;">Seat Availability</h4>
            <p class="text-body-sm text-on-secondary-container" style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">${n>0?n:0} seats vacant</p>
          </div>
        </div>
      </div>
    `}},te={renderLiveBadge(){return`
      <span class="text-on-surface-variant font-label-caps text-label-caps tracking-widest px-2.5 py-0.5 bg-surface-container rounded-md flex items-center gap-1 font-bold" style="display: inline-flex; align-items: center; gap: 4px; background: var(--color-surface-container); color: var(--color-text-secondary); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 8px; border-radius: 4px;">
        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping" style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); display: inline-block;" class="pulse-live"></span>
        LIVE
      </span>
    `},renderSpeed(t){return`
      <div class="flex flex-col" style="display: flex; flex-direction: column;">
        <span class="text-label-caps font-label-caps text-on-secondary-container mb-1" style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 4px;">CURRENT SPEED</span>
        <div class="flex items-baseline gap-1" style="display: flex; align-items: baseline; gap: 4px;">
          <span class="text-2xl md:text-headline-md text-primary font-bold" style="font-size: 24px; color: var(--color-primary); font-weight: 700;">${t!==void 0?t:"--"}</span>
          <span class="text-body-sm text-on-surface-variant" style="font-size: 12px; color: var(--color-text-secondary);">km/h</span>
        </div>
      </div>
    `},renderLastStop(t){return`
      <div class="flex flex-col" style="display: flex; flex-direction: column;">
        <span class="text-label-caps font-label-caps text-on-secondary-container mb-1" style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 4px;">LAST STOP</span>
        <span class="text-base md:text-title-lg text-on-surface truncate font-semibold" style="font-size: 16px; color: var(--color-text-primary); font-weight: 600; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${t||"--"}</span>
      </div>
    `}};let _=null,I=null;const he={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Transit Operations Center</h1>
            <p class="page-subtitle">Chennai & Vellore transit grid live monitoring portal.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge badge-success pulse-live">LIVE FEED</span>
            <span id="ops-sync-time" class="text-sm text-muted">Synced: Just now</span>
          </div>
        </div>
      </div>

      <!-- Split Operations layout -->
      <div class="ops-grid fade-in fade-in-delay-1">
        
        <!-- Left Side: Live Buses List -->
        <div class="flex flex-col gap-3" style="max-height: calc(100vh - 180px); overflow-y: auto;">
          <div class="card">
            <div class="card-header" style="padding: 10px 14px;">
              <div class="card-title text-sm">Active Telemetry</div>
              <span class="badge badge-primary" id="active-buses-count">0 Active</span>
            </div>
            <div class="card-body-flush" id="ops-bus-list" style="padding: 10px; display: flex; flex-direction: column; gap: 10px;">
              <!-- Dynamically populated live bus cards -->
            </div>
          </div>

          <!-- Live Incident Feed -->
          <div class="card">
            <div class="card-header" style="padding: 10px 14px;">
              <div class="card-title text-sm" style="color:var(--color-danger)">
                <span class="material-symbols-outlined text-danger">notifications_active</span>Critical Incident Log
              </div>
            </div>
            <div class="card-body-flush" id="ops-critical-alerts" style="max-height: 240px; overflow-y: auto;">
              <!-- Dynamic incidents lists -->
            </div>
          </div>
        </div>

        <!-- Right Side: Live Tracking Map & Selected Detail Sheet -->
        <div class="flex flex-col gap-4">
          <!-- The Leaflet map -->
          <div class="card" style="flex: 1; min-height: 440px; position: relative;">
            <div id="ops-map" style="width: 100%; height: 100%; min-height: 440px; z-index: 1;"></div>
          </div>

          <!-- Bottom Panel: Selected Bus telemetry breakdown -->
          <div class="card hidden" id="selected-telemetry-panel">
            <div class="card-header">
              <div class="card-title" id="telemetry-panel-title">
                <span class="material-symbols-outlined">radar</span>Bus Telemetry Details
              </div>
              <button class="btn-icon" id="close-telemetry-panel"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="card-body" id="telemetry-panel-body">
              <!-- populated dynamically -->
            </div>
          </div>
        </div>
      </div>
    `},mount(){var a;const t=window.location.hash,e=new URLSearchParams(t.split("?")[1]);e.has("id")&&(I=e.get("id")),E.init("ops-map",[13.0064,80.2577],12),E.drawRoutes(d.getRoutes()),_=s=>{this.updateBusList(s),this.updateAlertsFeed(s),this.updateTelemetryPanel(s),E.updateMarkers(s.tracking,s.occupancy);const i=document.getElementById("ops-sync-time");i&&(i.textContent=`Synced: ${new Date().toLocaleTimeString()}`)},d.subscribe("operations",_),(a=document.getElementById("close-telemetry-panel"))==null||a.addEventListener("click",()=>{var s;(s=document.getElementById("selected-telemetry-panel"))==null||s.classList.add("hidden"),I=null})},unmount(){_&&(d.unsubscribe("operations",_),_=null),E.destroy(),I=null},updateBusList(t){const e=document.getElementById("ops-bus-list");if(!e)return;const a=t.buses.filter(i=>i.status==="Active"),s=document.getElementById("active-buses-count");if(s&&(s.textContent=`${a.length} Active`),a.length===0){e.innerHTML='<div class="text-muted text-sm" style="text-align:center; padding: 20px;">No active transit vehicles.</div>';return}e.innerHTML=a.map(i=>{const n=t.tracking[i.id],o=t.occupancy[i.id];return!n||!o?"":`
        <div class="bus-live-card" style="box-shadow:none; ${i.id===I?"border-color:var(--color-primary); background:rgba(0, 87, 184, 0.04)":""}" data-ops-bus-id="${i.id}">
          <div class="bus-live-header" style="padding:10px 12px; display:flex; align-items:center; justify-content:space-between;">
            <div class="flex items-center gap-2" style="display:flex; align-items:center; gap:8px;">
              <div class="bus-route-badge" style="width:34px; height:34px; border-radius:6px; box-shadow:none; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <span class="bus-route-num" style="font-size:11px; font-weight:700; color:white;">${i.id}</span>
                <span class="bus-route-type" style="font-size:5px;">${i.type}</span>
              </div>
              <div class="bus-live-info" style="padding:0; display:flex; flex-direction:column;">
                <div class="bus-live-name" style="font-size:12px; font-weight:600;">${i.name}</div>
                <div class="bus-live-reg" style="font-size:9px; color:var(--color-text-muted);">${i.number}</div>
              </div>
            </div>
            <div>
              ${ee.render(o.percentage)}
            </div>
          </div>
          <div class="bus-live-body" style="padding:8px 12px; font-size:11px;">
            <div class="flex items-center justify-between mb-2" style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span class="text-muted">Currently at:</span>
              <span class="font-semibold truncate" style="max-width:140px; font-weight:600;">${n.currentStop}</span>
            </div>
            <div class="flex items-center justify-between" style="display:flex; justify-content:space-between;">
              <span class="text-muted">ETA next stop:</span>
              <span class="font-semibold text-primary-color" style="font-weight:600; color:var(--color-primary);">${n.eta} mins</span>
            </div>
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-ops-bus-id]").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-ops-bus-id");this.selectBus(n,t)})})},selectBus(t,e){I=t,this.updateTelemetryPanel(e);const a=e.tracking[t];a&&E.mapInstance&&(E.mapInstance.setView([a.lat,a.lng],14,{animate:!0}),E.busMarkers[t]&&E.busMarkers[t].openPopup()),this.updateBusList(e)},updateAlertsFeed(t){const e=document.getElementById("ops-critical-alerts");if(!e)return;const a=t.alerts.filter(s=>s.status==="Unread"&&(s.priority==="Critical"||s.priority==="High"));if(a.length===0){e.innerHTML='<div class="text-muted text-sm" style="text-align:center; padding:15px;">No active incidents recorded.</div>';return}e.innerHTML=a.slice(0,4).map(s=>{const i=s.priority==="Critical"?"critical":"high";return`
        <div class="alert-item" style="padding:10px 14px; border-bottom:1px solid rgba(195,198,215,0.2)" data-ops-alert-id="${s.id}">
          <div class="alert-icon-wrap ${i}" style="width:28px; height:28px;">
            <span class="material-symbols-outlined" style="font-size:16px;">warning</span>
          </div>
          <div class="alert-content">
            <div class="alert-title" style="font-size:11px; font-weight:700;">${s.title}</div>
            <div class="alert-desc" style="font-size:10px; max-height: 28px; overflow:hidden;">${s.desc}</div>
          </div>
          <div class="alert-meta" style="font-size:9px;">
            <div>${s.time}</div>
            <a href="javascript:void(0)" class="mark-read-ops" data-alert-id="${s.id}" style="color:var(--color-primary); font-weight:600;">Acknowledge</a>
          </div>
        </div>
      `}).join(""),e.querySelectorAll(".mark-read-ops").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const n=s.getAttribute("data-alert-id");d.markAlertAsRead(n),y.show("Incident Acknowledged","success","Alert marked as read")})}),e.querySelectorAll(".alert-item").forEach(s=>{s.addEventListener("click",()=>{const i=s.getAttribute("data-ops-alert-id"),n=t.alerts.find(o=>o.id===i);n&&n.busId&&this.selectBus(n.busId,t)})})},updateTelemetryPanel(t){const e=document.getElementById("selected-telemetry-panel"),a=document.getElementById("telemetry-panel-body"),s=document.getElementById("telemetry-panel-title");if(!e||!a)return;if(!I){e.classList.add("hidden");return}const i=t.buses.find(u=>u.id===I),n=t.tracking[I],o=t.occupancy[I],r=t.routes.find(u=>u.number===I),l=t.devices.find(u=>u.busId===I);if(!i||!n||!o){e.classList.add("hidden");return}e.classList.remove("hidden"),s&&(s.innerHTML=`
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined text-primary">radar</span>
          <span>Live Operations Feed: Bus ${i.id} - ${i.name}</span>
          ${te.renderLiveBadge()}
        </div>
      `);let c="";if(r&&r.stops){const u=n.lastStopIndex,g=n.nextStopIndex;c=r.stops.map((f,b)=>{let w="relative pl-10 pb-8 railway-line",C="",S="flex justify-between items-start",A="",J="";b===0?A="Source":b===r.stops.length-1&&(A="Destination",w="relative pl-10 pb-8"),b<=u?(w+=" railway-line-solid",C=`
            <div class="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 border-4 border-background" style="width:20px; height:20px; border-radius:50%; background:var(--color-primary); display:flex; align-items:center; justify-content:center; left:-10px; border:2px solid white;">
              <span class="material-symbols-outlined text-white text-[12px]" style="font-size:12px; color:white;">check</span>
            </div>
          `,S+=" opacity-70",J='<span class="text-body-sm text-on-surface-variant font-semibold" style="font-size:11px; color:var(--color-text-muted);">Passed</span>',b>0&&b<r.stops.length-1&&(A="Departed")):b===g?(C=`
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest border-2 border-primary rounded-full flex items-center justify-center z-10" style="width:20px; height:20px; border-radius:50%; background:var(--color-surface-container-high); border: 2px solid var(--color-primary); display:flex; align-items:center; justify-content:center; left:-10px;">
              <div style="width: 8px; height: 8px; background: var(--color-primary); border-radius: 50%;" class="pulse-live"></div>
            </div>
          `,w+=" bg-primary/5 p-2.5 md:p-3 rounded-xl border border-primary/20 -mt-1 ml-6 pl-3 pb-3",w=w.replace("pl-10",""),A=A?`${A} • Arriving`:`Arriving in ${n.eta} mins`,S+=" text-primary font-medium",J='<span class="text-body-sm text-primary font-bold" style="font-size:11px; font-weight:700; color:var(--color-primary);">Arriving</span>'):(C=`
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-high border-2 border-outline-variant rounded-full z-10" style="width:20px; height:20px; border-radius:50%; background:var(--color-surface-container); border:2px solid var(--color-border); left:-10px;"></div>
          `,S+=" opacity-50",A=A||`Distance: ${Math.round((f.distance-n.progress/100*r.stops[r.stops.length-1].distance)*10)/10} km`,J=`<span class="text-body-sm text-on-surface" style="font-size:11px;">${f.scheduledTime}</span>`);const ie=b<=u?"line-through":"";return`
          <div class="${w}" style="position:relative; margin-left: 20px; padding-bottom: 24px; padding-left: 20px;">
            ${C}
            <div class="${S}" style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <h3 class="text-base text-on-surface font-semibold" style="font-size:13px; font-weight:600; margin:0;">${f.name}</h3>
                <p class="text-body-sm text-on-surface-variant" style="font-size:11px; color:var(--color-text-secondary); margin:2px 0 0 0;">${A}</p>
              </div>
              <div class="text-right" style="text-align:right;">
                <span class="block font-label-caps text-label-caps text-on-secondary-container ${ie}" style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600; display:block;">${f.scheduledTime}</span>
                ${J}
              </div>
            </div>
          </div>
          
          ${b===u&&u!==r.stops.length-1?`
            <div class="relative pl-10 h-0 z-20" style="position:relative; height:0; z-index:20; margin-left:20px;">
              <div class="absolute -left-3 -top-3 flex items-center justify-center bg-white rounded-full p-1 shadow-md border-2 border-primary" style="position:absolute; left:-12px; top:-12px; background:white; border-radius:50%; padding:4px; border:2px solid var(--color-primary); display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);">
                <span class="material-symbols-outlined text-primary text-[16px] pulse-live" style="font-size:16px; color:var(--color-primary);" class="pulse-live">directions_bus</span>
              </div>
            </div>
          `:""}
        `}).join("")}let p="";l?(l.status==="Offline"||l.status==="Maintenance"||l.status,p=`
        <div style="font-size:12px;">
          <div style="margin-bottom:6px;"><b>ID:</b> <code style="background:#f1f5f9; padding:2px 4px; border-radius:3px">${l.id}</code></div>
          <div style="margin-bottom:6px;"><b>Status:</b> <span class="badge ${l.status==="Online"?"badge-success":"badge-danger"}">${l.status}</span></div>
          <div style="margin-bottom:6px;"><b>Signal:</b> ${l.rssi}</div>
          <div style="margin-bottom:6px;"><b>FW Version:</b> ${l.fwVersion}</div>
          <div style="margin-bottom:6px;"><b>Heap Remaining:</b> ${l.heap}</div>
          <div><b>Core Temp:</b> ${l.temperature}</div>
        </div>
      `):p='<div class="text-muted text-sm">No IoT transmitter linked to this vehicle.</div>',a.innerHTML=`
      <div class="telemetry-grid">
        
        <!-- Reused Occupancy Cards & Speed indicators -->
        <div>
          <h4 class="font-bold text-sm mb-3" style="text-transform:uppercase; color:var(--color-text-muted); font-size:11px; font-weight:700; margin-bottom:12px;">Live Occupancy & Speed</h4>
          ${ye.render(i,o)}
          
          <div style="display:flex; justify-content:space-between; margin-top:16px; border-top:1px solid var(--color-border-subtle); padding-top:12px;">
            ${te.renderSpeed(n.speed)}
            ${te.renderLastStop(n.currentStop)}
          </div>
        </div>

        <!-- Stop timelines progression -->
        <div>
          <h4 class="font-bold text-sm mb-3" style="text-transform:uppercase; color:var(--color-text-muted); font-size:11px; font-weight:700; margin-bottom:12px;">Route Stop Progression</h4>
          <div class="route-timeline" style="max-height:220px; overflow-y:auto; padding-top:4px;">
            ${c||'<div class="text-muted text-sm">No active path timeline.</div>'}
          </div>
        </div>

        <!-- IoT Node diagnostics info -->
        <div style="border-left: 1px solid var(--color-border-subtle); padding-left:16px;">
          <h4 class="font-bold text-sm mb-3" style="text-transform:uppercase; color:var(--color-text-muted); font-size:11px; font-weight:700; margin-bottom:12px;">ESP32 Node Status</h4>
          ${p}
        </div>
      </div>
    `}};let V=null,W="",P="All",T="All";const xe={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Bus Fleet Management</h1>
            <p class="page-subtitle">Add, edit, monitor, and decommission public transit vehicles.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-bus">
            <span class="material-symbols-outlined">add</span>Register Vehicle
          </button>
        </div>
      </div>

      <!-- Filters Toolbar -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="bus-search" class="search-input" placeholder="Search by ID, Reg. No, Driver..." value="${W}">
            </div>
            
            <select id="filter-bus-status" class="filter-select">
              <option value="All" ${P==="All"?"selected":""}>All Statuses</option>
              <option value="Active" ${P==="Active"?"selected":""}>Active Only</option>
              <option value="Inactive" ${P==="Inactive"?"selected":""}>Inactive Only</option>
            </select>

            <select id="filter-bus-occupancy" class="filter-select">
              <option value="All" ${T==="All"?"selected":""}>All Load Levels</option>
              <option value="Low" ${T==="Low"?"selected":""}>Low (&lt;40%)</option>
              <option value="Medium" ${T==="Medium"?"selected":""}>Medium (40-75%)</option>
              <option value="High" ${T==="High"?"selected":""}>High (&gt;75%)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Fleet Data Table -->
      <div class="card fade-in fade-in-delay-2">
        <div class="card-body-flush">
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Bus ID / Route</th>
                  <th>Reg. Number</th>
                  <th>Vehicle Name</th>
                  <th>Driver Name</th>
                  <th>Linked IoT Device</th>
                  <th>Load Capacity</th>
                  <th>Operational Status</th>
                  <th style="text-align:right">Actions</th>
                </tr>
              </thead>
              <tbody id="buses-table-body">
                <!-- populated dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `},mount(){var s;V=i=>{this.renderTable(i)},d.subscribe("buses",V);const t=document.getElementById("bus-search"),e=document.getElementById("filter-bus-status"),a=document.getElementById("filter-bus-occupancy");t==null||t.addEventListener("input",i=>{W=i.target.value,this.updateTable()}),e==null||e.addEventListener("change",i=>{P=i.target.value,this.updateTable()}),a==null||a.addEventListener("change",i=>{T=i.target.value,this.updateTable()}),(s=document.getElementById("btn-add-bus"))==null||s.addEventListener("click",()=>{this.openAddBusModal()})},unmount(){V&&(d.unsubscribe("buses",V),V=null)},updateTable(){const t={buses:d.getBuses(),routes:d.getRoutes(),devices:d.getDevices(),alerts:d.getAlerts(),tracking:d.getLiveState().tracking,occupancy:d.getLiveState().occupancy};this.renderTable(t)},renderTable(t){const e=document.getElementById("buses-table-body");if(!e)return;let a=t.buses;if(W){const s=W.toLowerCase();a=a.filter(i=>i.id.toLowerCase().includes(s)||i.number.toLowerCase().includes(s)||i.name.toLowerCase().includes(s)||i.driverName.toLowerCase().includes(s))}if(P!=="All"&&(a=a.filter(s=>s.status===P)),T!=="All"&&(a=a.filter(s=>{const i=t.occupancy[s.id];return i?T==="Low"?i.percentage<=40:T==="Medium"?i.percentage>40&&i.percentage<=75:T==="High"?i.percentage>75:!0:!1})),a.length===0){e.innerHTML=`
        <tr>
          <td colspan="8" style="text-align:center; padding: 32px;" class="text-muted">
            No buses matched your query.
          </td>
        </tr>
      `;return}e.innerHTML=a.map(s=>{const i=t.occupancy[s.id];t.tracking[s.id];const n=i?`${i.passengers} / ${s.capacity} (${i.percentage}%)`:`0 / ${s.capacity} (0%)`;let o=s.status==="Active"?"badge-success":"badge-neutral",r=s.deviceId?`<code style="background:#f1f5f9; padding:2px 4px; border-radius:3px">${s.deviceId}</code>`:'<span class="text-muted">None</span>';return`
        <tr>
          <td class="td-primary" data-label="Bus ID">Route ${s.id}</td>
          <td data-label="Reg. Number">${s.number}</td>
          <td data-label="Vehicle Name">${s.name}</td>
          <td data-label="Driver Name">${s.driverName}</td>
          <td data-label="IoT Device">${r}</td>
          <td data-label="Capacity / Load" style="display:flex; align-items:center; gap:8px; border:none; padding:12px 16px;">
            <span>${n}</span>
            ${i?ee.render(i.percentage):""}
          </td>
          <td data-label="Operational Status"><span class="badge ${o}">${s.status}</span></td>
          <td style="text-align:right" class="td-actions" data-label="Actions">
            <button class="btn-icon view-bus" data-bus-id="${s.id}" title="View Details"><span class="material-symbols-outlined">visibility</span></button>
            <button class="btn-icon edit-bus" data-bus-id="${s.id}" title="Edit Metadata"><span class="material-symbols-outlined">edit</span></button>
            <button class="btn-icon delete-bus" style="color:var(--color-danger)" data-bus-id="${s.id}" title="Decommission"><span class="material-symbols-outlined">delete</span></button>
          </td>
        </tr>
      `}).join(""),e.querySelectorAll(".view-bus").forEach(s=>{s.addEventListener("click",()=>this.viewBusDetails(s.getAttribute("data-bus-id")))}),e.querySelectorAll(".edit-bus").forEach(s=>{s.addEventListener("click",()=>this.openEditBusModal(s.getAttribute("data-bus-id")))}),e.querySelectorAll(".delete-bus").forEach(s=>{s.addEventListener("click",()=>this.decommissionBus(s.getAttribute("data-bus-id")))})},openAddBusModal(){var r,l;const t=d.getRoutes(),e=t.map(c=>`<option value="${c.number}">${c.number} - ${c.source} to ${c.destination}</option>`).join(""),s='<option value="">None</option>'+d.getDevices().filter(c=>!c.busId).map(c=>`<option value="${c.id}">${c.id}</option>`).join(""),i=`
      <form id="form-add-bus">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Bus Number (Route ID)</label>
            <input type="text" name="id" class="form-control" placeholder="e.g. 500" required>
          </div>
          <div class="form-group">
            <label class="form-label">Registration Plate</label>
            <input type="text" name="number" class="form-control" placeholder="e.g. TN-01-N-9999" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Vehicle Name</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. Broad City Fast" required>
          </div>
          <div class="form-group">
            <label class="form-label">Vehicle Type</label>
            <select name="type" class="form-control">
              <option value="Local">Local</option>
              <option value="Express">Express</option>
              <option value="Fast">Fast</option>
              <option value="City">City</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Total Seat Capacity</label>
            <input type="number" name="capacity" class="form-control" value="60" required>
          </div>
          <div class="form-group">
            <label class="form-label">Driver Name</label>
            <input type="text" name="driverName" class="form-control" placeholder="Driver full name" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Linked Route Route</label>
            <select name="routeNum" class="form-control">
              ${e}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Linked ESP32 IoT Node</label>
            <select name="deviceId" class="form-control">
              ${s}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Operational Status</label>
          <select name="status" class="form-control">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </form>
    `,o=L.show({title:"Register New Bus Node",bodyHtml:i,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-add">Cancel</button>
      <button class="btn btn-primary" id="btn-save-add">Save Vehicle</button>
    `});(r=document.getElementById("btn-cancel-add"))==null||r.addEventListener("click",()=>o.close()),(l=document.getElementById("btn-save-add"))==null||l.addEventListener("click",()=>{const c=document.getElementById("form-add-bus");if(!c.checkValidity()){c.reportValidity();return}const p=new FormData(c),u={id:p.get("id"),number:p.get("number"),name:p.get("name"),type:p.get("type"),capacity:parseInt(p.get("capacity")),driverName:p.get("driverName"),status:p.get("status"),deviceId:p.get("deviceId")||"",source:"Depot",destination:"Terminal"},g=t.find(b=>b.number===p.get("routeNum"));g&&(u.source=g.source,u.destination=g.destination);const f=p.get("deviceId");f&&d.updateDevice(f,{busId:u.id,status:"Online"}),d.addBus(u),y.show("Vehicle Registered","success",`Bus ${u.id} registered successfully.`),o.close(),this.updateTable()})},openEditBusModal(t){var c,p;const e=d.getBuses().find(u=>u.id===t);if(!e)return;const s=d.getRoutes().map(u=>`<option value="${u.number}" ${u.number===e.id?"selected":""}>${u.number} - ${u.source} to ${u.destination}</option>`).join(""),n='<option value="">None</option>'+d.getDevices().filter(u=>!u.busId||u.busId===e.id).map(u=>`<option value="${u.id}" ${u.id===e.deviceId?"selected":""}>${u.id}</option>`).join(""),o=`
      <form id="form-edit-bus">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Bus Number (Route ID)</label>
            <input type="text" name="id" class="form-control" value="${e.id}" disabled>
          </div>
          <div class="form-group">
            <label class="form-label">Registration Plate</label>
            <input type="text" name="number" class="form-control" value="${e.number}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Vehicle Name</label>
            <input type="text" name="name" class="form-control" value="${e.name}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Vehicle Type</label>
            <select name="type" class="form-control">
              <option value="Local" ${e.type==="Local"?"selected":""}>Local</option>
              <option value="Express" ${e.type==="Express"?"selected":""}>Express</option>
              <option value="Fast" ${e.type==="Fast"?"selected":""}>Fast</option>
              <option value="City" ${e.type==="City"?"selected":""}>City</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Total Seat Capacity</label>
            <input type="number" name="capacity" class="form-control" value="${e.capacity}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Driver Name</label>
            <input type="text" name="driverName" class="form-control" value="${e.driverName}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Linked Route Route</label>
            <select name="routeNum" class="form-control" disabled>
              ${s}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Linked ESP32 IoT Node</label>
            <select name="deviceId" class="form-control">
              ${n}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Operational Status</label>
          <select name="status" class="form-control">
            <option value="Active" ${e.status==="Active"?"selected":""}>Active</option>
            <option value="Inactive" ${e.status==="Inactive"?"selected":""}>Inactive</option>
          </select>
        </div>
      </form>
    `,l=L.show({title:`Configure Metadata: Bus ${e.id}`,bodyHtml:o,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-edit">Cancel</button>
      <button class="btn btn-primary" id="btn-save-edit">Save Changes</button>
    `});(c=document.getElementById("btn-cancel-edit"))==null||c.addEventListener("click",()=>l.close()),(p=document.getElementById("btn-save-edit"))==null||p.addEventListener("click",()=>{const u=document.getElementById("form-edit-bus");if(!u.checkValidity()){u.reportValidity();return}const g=new FormData(u),f=e.deviceId,b=g.get("deviceId")||"",w={number:g.get("number"),name:g.get("name"),type:g.get("type"),capacity:parseInt(g.get("capacity")),driverName:g.get("driverName"),status:g.get("status"),deviceId:b};f!==b&&(f&&d.updateDevice(f,{busId:""}),b&&d.updateDevice(b,{busId:e.id,status:"Online"})),d.updateBus(e.id,w),y.show("Vehicle Configured","success",`Metadata for Bus ${e.id} updated.`),l.close(),this.updateTable()})},decommissionBus(t){const e=d.getBuses().find(a=>a.id===t);e&&confirm(`Are you sure you want to decommission/delete Bus Route ${t}? This removes its live tracking feeds.`)&&(e.deviceId&&d.updateDevice(e.deviceId,{busId:""}),d.deleteBus(t),y.show("Bus Decommissioned","danger",`Bus ${t} decommissioned.`),this.updateTable())},viewBusDetails(t){var p;const e={buses:d.getBuses(),routes:d.getRoutes(),devices:d.getDevices(),tracking:d.getLiveState().tracking,occupancy:d.getLiveState().occupancy},a=e.buses.find(u=>u.id===t),s=e.tracking[t],i=e.occupancy[t],n=e.routes.find(u=>u.number===t);if(!a)return;const o=n?n.stops.map(u=>`<li>${u.name} (${u.scheduledTime})</li>`).join(""):"No routes linked.",r=s?s.lat:"N/A",l=s?s.lng:"N/A",c=`
      <div style="font-size:13px; line-height:1.6;">
        <div style="margin-bottom:12px;"><b>Registration Plate:</b> ${a.number}</div>
        <div style="margin-bottom:12px;"><b>Service Route Name:</b> ${a.name}</div>
        <div style="margin-bottom:12px;"><b>Driver Assigned:</b> ${a.driverName}</div>
        <div style="margin-bottom:12px;"><b>Active Route:</b> ${a.source} &rarr; ${a.destination}</div>
        <div style="margin-bottom:12px;"><b>IoT node hardware:</b> <code>${a.deviceId||"Unlinked"}</code></div>
        
        <div style="border-top:1px solid var(--color-border-subtle); padding-top:12px; margin-top:12px;">
          <h4 class="font-bold text-sm mb-2" style="color:var(--color-primary);">Live Telemetry Status</h4>
          <div><b>Status:</b> <span class="badge ${a.status==="Active"?"badge-success":"badge-neutral"}">${a.status}</span></div>
          <div><b>Occupancy Load:</b> ${i?`${i.passengers} / ${a.capacity} (${i.percentage}%)`:"N/A"}</div>
          <div><b>Current Stop:</b> ${s?s.currentStop:"N/A"}</div>
          <div><b>Next Stop:</b> ${s?s.nextStop:"N/A"}</div>
          <div><b>Coordinates:</b> ${r}, ${l}</div>
        </div>

        <div style="border-top:1px solid var(--color-border-subtle); padding-top:12px; margin-top:12px;">
          <h4 class="font-bold text-sm mb-2" style="color:var(--color-primary);">Stops Timeline</h4>
          <ol style="padding-left:20px; list-style-type: decimal;">
            ${o}
          </ol>
        </div>
      </div>
    `;L.show({title:`Bus telemetry diagnostics: Route ${t}`,bodyHtml:c,footerHtml:'<button class="btn btn-primary" id="btn-close-view">Done</button>'}),(p=document.getElementById("btn-close-view"))==null||p.addEventListener("click",()=>{var u;(u=document.getElementById("modal-overlay"))==null||u.classList.add("hidden"),document.body.style.overflow=""})}};let j=null,Y="";const we={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Route Path Configuration</h1>
            <p class="page-subtitle">Configure source, destination, stops coordinates, scheduling, and bus assignments.</p>
          </div>
          <button class="btn btn-primary" id="btn-create-route">
            <span class="material-symbols-outlined">add_road</span>Create Route Path
          </button>
        </div>
      </div>

      <!-- Search Toolbar -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="route-search" class="search-input" placeholder="Search by Route ID, source, destination..." value="${Y}">
            </div>
          </div>
        </div>
      </div>

      <!-- Routes Grid -->
      <div class="grid-2 fade-in fade-in-delay-2" id="routes-grid-container">
        <!-- populated dynamically -->
      </div>
    `},mount(){var t,e;j=a=>{this.renderRoutes(a)},d.subscribe("routes",j),(t=document.getElementById("route-search"))==null||t.addEventListener("input",a=>{Y=a.target.value,this.updateRoutes()}),(e=document.getElementById("btn-create-route"))==null||e.addEventListener("click",()=>{this.openCreateRouteModal()})},unmount(){j&&(d.unsubscribe("routes",j),j=null)},updateRoutes(){const t={buses:d.getBuses(),routes:d.getRoutes(),tracking:d.getLiveState().tracking,occupancy:d.getLiveState().occupancy};this.renderRoutes(t)},renderRoutes(t){const e=document.getElementById("routes-grid-container");if(!e)return;let a=t.routes;if(Y){const s=Y.toLowerCase();a=a.filter(i=>i.number.toLowerCase().includes(s)||i.name.toLowerCase().includes(s)||i.source.toLowerCase().includes(s)||i.destination.toLowerCase().includes(s))}if(a.length===0){e.innerHTML=`
        <div class="card" style="grid-column: span 2; padding:40px; text-align:center;">
          <p class="text-muted">No route configurations found.</p>
        </div>
      `;return}e.innerHTML=a.map(s=>{const i=t.buses.filter(l=>l.id===s.number),n=s.stops?s.stops.length:0,o=i.length>0?i.map(l=>`<span class="badge badge-primary">Bus ${l.id}</span>`).join(" "):'<span class="text-muted text-sm">None assigned</span>',r=s.stops?s.stops.map(l=>l.name).join(" &rarr; "):"No stops configured.";return`
        <div class="card flex flex-col justify-between">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">route</span>Route ${s.number}
            </div>
            <div class="card-actions">
              <button class="btn-icon edit-route" data-route-id="${s.number}" title="Edit Path"><span class="material-symbols-outlined">edit</span></button>
              <button class="btn-icon delete-route" style="color:var(--color-danger)" data-route-id="${s.number}" title="Delete Route"><span class="material-symbols-outlined">delete</span></button>
            </div>
          </div>
          <div class="card-body">
            <h3 class="font-bold text-sm mb-2" style="color:var(--color-text-secondary); text-transform:uppercase;">${s.name}</h3>
            
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-muted" style="font-size:16px;">explore</span>
              <span class="text-sm font-semibold">${s.source} &rarr; ${s.destination}</span>
            </div>

            <div class="text-sm mb-3">
              <div class="text-muted mb-1 font-semibold text-[11px] uppercase tracking-wider">Transit Sequence (${n} Stops):</div>
              <div class="truncate text-muted" style="font-size:12px;" title="${r}">${r}</div>
            </div>

            <div class="grid-2 mb-4" style="background:#f8fafc; padding:10px; border-radius:8px;">
              <div>
                <div class="text-muted text-[10px] uppercase font-bold">Daily Passengers</div>
                <div class="font-bold text-primary-color" style="font-size:15px;">${s.dailyPassengers}</div>
              </div>
              <div>
                <div class="text-muted text-[10px] uppercase font-bold">Peak load</div>
                <div class="font-bold text-danger" style="font-size:15px;">${s.occupancyStats.peak}</div>
              </div>
            </div>

            <div class="flex items-center justify-between" style="border-top:1px solid var(--color-border-subtle); padding-top:12px; margin-top:12px;">
              <span class="text-sm font-semibold">Assigned Fleet:</span>
              <div class="flex flex-wrap gap-1">${o}</div>
            </div>
          </div>
        </div>
      `}).join(""),e.querySelectorAll(".edit-route").forEach(s=>{s.addEventListener("click",()=>this.openEditRouteModal(s.getAttribute("data-route-id")))}),e.querySelectorAll(".delete-route").forEach(s=>{s.addEventListener("click",()=>this.deleteRoute(s.getAttribute("data-route-id")))})},openCreateRouteModal(){var s,i;const a=L.show({title:"Configure New Smart Route Path",bodyHtml:`
      <form id="form-create-route">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Route Number</label>
            <input type="text" name="number" class="form-control" placeholder="e.g. 570" required>
          </div>
          <div class="form-group">
            <label class="form-label">Route Name</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. OMR Express Route" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Source Terminus</label>
            <input type="text" name="source" class="form-control" placeholder="e.g. Koyambedu" required>
          </div>
          <div class="form-group">
            <label class="form-label">Destination Terminus</label>
            <input type="text" name="destination" class="form-control" placeholder="e.g. Siruseri IT Park" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Stops Sequence (comma-separated names)</label>
          <textarea name="stopsList" class="form-control" rows="3" placeholder="Anna Nagar, Teynampet, Gemini Flyover, Guindy" required></textarea>
          <small class="text-muted">Enter stop names in order. Map coordinates will be simulated automatically.</small>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Estimated Daily Commuters</label>
            <input type="number" name="dailyPassengers" class="form-control" value="1200" required>
          </div>
          <div class="form-group">
            <label class="form-label">Peak Occupancy Trend (%)</label>
            <input type="text" name="peakOcc" class="form-control" value="80%" placeholder="e.g. 85%" required>
          </div>
        </div>
      </form>
    `,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-route">Cancel</button>
      <button class="btn btn-primary" id="btn-save-route">Save Route Configuration</button>
    `});(s=document.getElementById("btn-cancel-route"))==null||s.addEventListener("click",()=>a.close()),(i=document.getElementById("btn-save-route"))==null||i.addEventListener("click",()=>{const n=document.getElementById("form-create-route");if(!n.checkValidity()){n.reportValidity();return}const o=new FormData(n),r=o.get("stopsList").split(",").map(u=>u.trim()).filter(u=>u.length>0),l=r.map((u,g)=>{const f=g/Math.max(1,r.length-1);return{name:u,distance:parseFloat((f*15).toFixed(1)),scheduledTime:`${8+Math.floor(g/2)}:${g%2===0?"00":"30"} AM`,lat:13.0064+f*.05-Math.random()*.01,lng:80.2577-f*.04+Math.random()*.01}}),c=o.get("number"),p={number:c,name:o.get("name"),source:o.get("source"),destination:o.get("destination"),stops:l,dailyPassengers:parseInt(o.get("dailyPassengers")),occupancyStats:{peak:o.get("peakOcc"),avg:"45%"}};d.addRoute(p),y.show("Route Configuration Saved","success",`Route ${c} created successfully.`),a.close(),this.updateRoutes()})},openEditRouteModal(t){var o,r;const e=d.getRoutes().find(l=>l.number===t);if(!e)return;const a=e.stops?e.stops.map(l=>l.name).join(", "):"",s=`
      <form id="form-edit-route">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Route Number</label>
            <input type="text" name="number" class="form-control" value="${e.number}" disabled>
          </div>
          <div class="form-group">
            <label class="form-label">Route Name</label>
            <input type="text" name="name" class="form-control" value="${e.name}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Source Terminus</label>
            <input type="text" name="source" class="form-control" value="${e.source}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Destination Terminus</label>
            <input type="text" name="destination" class="form-control" value="${e.destination}" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Stops Sequence (comma-separated names)</label>
          <textarea name="stopsList" class="form-control" rows="3" required>${a}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Daily Commuters count</label>
            <input type="number" name="dailyPassengers" class="form-control" value="${e.dailyPassengers}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Peak Occupancy (%)</label>
            <input type="text" name="peakOcc" class="form-control" value="${e.occupancyStats.peak}" required>
          </div>
        </div>
      </form>
    `,n=L.show({title:`Configure Path: Route ${e.number}`,bodyHtml:s,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-route">Cancel</button>
      <button class="btn btn-primary" id="btn-save-route">Save Changes</button>
    `});(o=document.getElementById("btn-cancel-route"))==null||o.addEventListener("click",()=>n.close()),(r=document.getElementById("btn-save-route"))==null||r.addEventListener("click",()=>{const l=document.getElementById("form-edit-route");if(!l.checkValidity()){l.reportValidity();return}const c=new FormData(l),p=c.get("stopsList").split(",").map(f=>f.trim()).filter(f=>f.length>0),u=p.map((f,b)=>{const w=b/Math.max(1,p.length-1);return{name:f,distance:parseFloat((w*15).toFixed(1)),scheduledTime:`${9+Math.floor(b/2)}:${b%2===0?"00":"30"} AM`,lat:13.0064+w*.04,lng:80.2577-w*.03}}),g={name:c.get("name"),source:c.get("source"),destination:c.get("destination"),stops:u,dailyPassengers:parseInt(c.get("dailyPassengers")),occupancyStats:{peak:c.get("peakOcc"),avg:e.occupancyStats.avg}};d.updateRoute(e.number,g),y.show("Route Configuration Saved","success",`Metadata for Route ${e.number} updated.`),n.close(),this.updateRoutes()})},deleteRoute(t){confirm(`Are you sure you want to delete Route Path ${t}? This does not delete buses but unassigns their stop timeline.`)&&(d.deleteRoute(t),y.show("Route Deleted","danger",`Route config ${t} removed.`),this.updateRoutes())}};let q=null,Q="",k="All";const Se={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">ESP32 IoT Nodes telemetry</h1>
            <p class="page-subtitle">Monitor physical sensor units, firmware states, and serial log lines.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-device">
            <span class="material-symbols-outlined">developer_board</span>Register ESP32 Node
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="device-search" class="search-input" placeholder="Search by Device ID or linked bus..." value="${Q}">
            </div>
            
            <select id="filter-device-status" class="filter-select">
              <option value="All" ${k==="All"?"selected":""}>All States</option>
              <option value="Online" ${k==="Online"?"selected":""}>Online</option>
              <option value="Offline" ${k==="Offline"?"selected":""}>Offline</option>
              <option value="Maintenance" ${k==="Maintenance"?"selected":""}>Maintenance</option>
              <option value="Fault" ${k==="Fault"?"selected":""}>Fault Detected</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Devices List -->
      <div class="card fade-in fade-in-delay-2">
        <div class="card-body-flush">
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Assigned Vehicle</th>
                  <th>Signal (RSSI)</th>
                  <th>Core Temp</th>
                  <th>Free Memory Heap</th>
                  <th>FW Version</th>
                  <th>Last Telemetry Sync</th>
                  <th>Health Status</th>
                  <th style="text-align:right">Actions</th>
                </tr>
              </thead>
              <tbody id="devices-table-body">
                <!-- populated dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `},mount(){var t,e,a;q=s=>{this.renderTable(s)},d.subscribe("devices",q),(t=document.getElementById("device-search"))==null||t.addEventListener("input",s=>{Q=s.target.value,this.updateTable()}),(e=document.getElementById("filter-device-status"))==null||e.addEventListener("change",s=>{k=s.target.value,this.updateTable()}),(a=document.getElementById("btn-add-device"))==null||a.addEventListener("click",()=>{this.openAddDeviceModal()})},unmount(){q&&(d.unsubscribe("devices",q),q=null)},updateTable(){const t={buses:d.getBuses(),devices:d.getDevices(),tracking:d.getLiveState().tracking,occupancy:d.getLiveState().occupancy};this.renderTable(t)},renderTable(t){const e=document.getElementById("devices-table-body");if(!e)return;let a=t.devices;if(Q){const s=Q.toLowerCase();a=a.filter(i=>i.id.toLowerCase().includes(s)||i.busId&&i.busId.toLowerCase().includes(s))}if(k!=="All"&&(a=a.filter(s=>s.status===k)),a.length===0){e.innerHTML=`
        <tr>
          <td colspan="9" style="text-align:center; padding: 32px;" class="text-muted">No hardware node logs matching selection.</td>
        </tr>
      `;return}e.innerHTML=a.map(s=>{let i="badge-success";s.status==="Offline"?i="badge-neutral":s.status==="Maintenance"?i="badge-warning":s.status==="Fault"&&(i="badge-danger");const n=s.busId?`<span class="td-primary">Bus Route ${s.busId}</span>`:'<span class="text-muted text-sm">Unassigned</span>';return`
        <tr>
          <td class="td-primary"><code>${s.id}</code></td>
          <td data-label="Assigned Vehicle">${n}</td>
          <td data-label="RSSI">${s.rssi}</td>
          <td data-label="Temp">${s.temperature}</td>
          <td data-label="Free Heap">${s.heap}</td>
          <td data-label="FW Version"><code>${s.fwVersion}</code></td>
          <td data-label="Last Ping">${s.lastComm}</td>
          <td data-label="Status"><span class="badge ${i}">${s.status}</span></td>
          <td style="text-align:right" class="td-actions" data-label="Actions">
            <button class="btn-icon view-logs" data-device-id="${s.id}" title="ESP32 Console Stream"><span class="material-symbols-outlined">terminal</span></button>
            <button class="btn-icon flash-fw" data-device-id="${s.id}" title="OTA Update Firmware"><span class="material-symbols-outlined">system_update_alt</span></button>
            <button class="btn-icon edit-device" data-device-id="${s.id}" title="Edit Device"><span class="material-symbols-outlined">edit</span></button>
            <button class="btn-icon delete-device" style="color:var(--color-danger)" data-device-id="${s.id}" title="De-register Node"><span class="material-symbols-outlined">delete</span></button>
          </td>
        </tr>
      `}).join(""),e.querySelectorAll(".view-logs").forEach(s=>{s.addEventListener("click",()=>this.viewSerialMonitor(s.getAttribute("data-device-id")))}),e.querySelectorAll(".flash-fw").forEach(s=>{s.addEventListener("click",()=>this.flashFirmwareOta(s.getAttribute("data-device-id")))}),e.querySelectorAll(".edit-device").forEach(s=>{s.addEventListener("click",()=>this.openEditDeviceModal(s.getAttribute("data-device-id")))}),e.querySelectorAll(".delete-device").forEach(s=>{s.addEventListener("click",()=>this.deleteDevice(s.getAttribute("data-device-id")))})},viewSerialMonitor(t){var r,l;const e=d.getDevices().find(c=>c.id===t);if(!e)return;const s=`
      <div style="background:#0F172A; color:#38BDF8; font-family:'Courier New', monospace; padding:16px; border-radius:8px; height: 320px; overflow-y: auto; font-size:12px; line-height:1.5;" id="serial-terminal">
        <p style="color:#22C55E;">[SYS] Serial Console initialized. Baud Rate: 115200</p>
        <p style="color:#94A3B8;">[SYS] Node Connected. Boot Time: ${new Date(Date.now()-36e5).toLocaleString()}</p>
        <p style="color:#E2E8F0;">[INIT] WiFi connecting to 'CrowdSense_Net_5G' ...</p>
        <p style="color:#22C55E;">[INIT] WiFi Connected! IP Address: 192.168.4.152</p>
        <p style="color:#E2E8F0;">[MQTT] Establishing connection to Broker: broker.hivemq.com:1883</p>
        <p style="color:#22C55E;">[MQTT] Connected. Subscribing to: crowdsense/bus/${e.busId||"unassigned"}/cmd</p>
        <p style="color:#F1F5F9;">[SENSORS] VL53L1X laser rangefinder loaded. Status: OK</p>
        <p style="color:#F1F5F9;">[SENSORS] GPS Neo-6M Lock established. Sats: 8</p>
        <p style="color:#94A3B8;">[LOOP] Telemetry heartbeat sent. RSSI: ${e.rssi}, Heap: ${e.heap}, Temp: ${e.temperature}</p>
        <p style="color:#34D399;">[JSON] {"client_id":"${e.id}","lat":13.0064,"lng":80.2577,"passengers":${e.busId?"35":"0"},"doors_active":0}</p>
        <p id="serial-pulse" style="color:#E2E8F0;">[LOOP] Listening for IR beams events...</p>
      </div>
    `,i=L.show({title:`ESP32 Serial Stream - Node ${e.id}`,bodyHtml:s,footerHtml:`
        <button class="btn btn-secondary btn-sm" id="btn-reboot-node"><span class="material-symbols-outlined">restart_alt</span>Soft Reset</button>
        <button class="btn btn-primary btn-sm" id="btn-close-serial">Close Terminal</button>
      `}),n=document.getElementById("serial-terminal");n&&(n.scrollTop=n.scrollHeight);const o=setInterval(()=>{const c=document.getElementById("serial-terminal");if(!c){clearInterval(o);return}const p=document.createElement("p");p.style.color="#38BDF8",p.textContent=`[LOOP] [${new Date().toLocaleTimeString()}] Ping heartbeat OK. RSSI: -${60+Math.floor(Math.random()*10)} dBm | Free Heap: ${170+Math.floor(Math.random()*10)} KB`,c.insertBefore(p,document.getElementById("serial-pulse")),c.scrollTop=c.scrollHeight},3e3);(r=document.getElementById("btn-close-serial"))==null||r.addEventListener("click",()=>{clearInterval(o),i.close()}),(l=document.getElementById("btn-reboot-node"))==null||l.addEventListener("click",()=>{y.show("Reset Command Sent","warning",`ESP32 ${e.id} restarting.`),clearInterval(o),i.close()})},flashFirmwareOta(t){var i,n;const e=`
      <div style="font-size:13px; line-height:1.6;">
        <p>You are about to flash a firmware update Over-The-Air (OTA) to <b>ESP32 Node ${t}</b>.</p>
        <div style="margin: 16px 0; background:#f8fafc; padding:12px; border-radius:8px;">
          <div><b>Current version:</b> v1.4.2</div>
          <div><b>New target version:</b> v1.5.0-Stable</div>
          <div><b>Payload size:</b> 1.84 MB</div>
        </div>
        <div class="form-group">
          <label class="form-label">Update Speed / Profile</label>
          <select class="form-control" id="fw-profile">
            <option value="standard">Standard Secure (Recommended)</option>
            <option value="fast">High-speed Unbuffered</option>
          </select>
        </div>
        <div class="occ-bar-wrap hidden" id="flash-progress-bar" style="margin-top:12px;">
          <div class="occ-bar low" style="width: 0%;" id="flash-progress-fill"></div>
        </div>
        <p id="flash-status" class="text-muted text-sm mt-1"></p>
      </div>
    `,s=L.show({title:`OTA Firmware Update Node ${t}`,bodyHtml:e,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-flash">Cancel</button>
      <button class="btn btn-primary" id="btn-do-flash">Start Flash update</button>
    `});(i=document.getElementById("btn-cancel-flash"))==null||i.addEventListener("click",()=>s.close()),(n=document.getElementById("btn-do-flash"))==null||n.addEventListener("click",()=>{const o=document.getElementById("btn-do-flash");o.disabled=!0,o.textContent="Flashing...";const r=document.getElementById("flash-progress-bar"),l=document.getElementById("flash-progress-fill"),c=document.getElementById("flash-status");r==null||r.classList.remove("hidden");let p=0;const u=setInterval(()=>{p+=10,l&&(l.style.width=`${p}%`),c&&(c.textContent=`Uploading binaries: ${p}%`),p>=100&&(clearInterval(u),c&&(c.textContent="Update complete. Rebooting ESP32 Node..."),setTimeout(()=>{d.updateDevice(t,{fwVersion:"v1.5.0",status:"Online"}),y.show("Firmware Updated","success",`ESP32 Node ${t} flashed to v1.5.0`),s.close(),this.updateTable()},1500))},300)})},openAddDeviceModal(){var n,o;const a=`
      <form id="form-add-device">
        <div class="form-group">
          <label class="form-label">Device MAC ID</label>
          <input type="text" name="id" class="form-control" placeholder="e.g. ESP32-0570" required>
        </div>
        <div class="form-group">
          <label class="form-label">Linked Bus Vehicle</label>
          <select name="busId" class="form-control">
            ${'<option value="">Unassigned</option>'+d.getBuses().filter(r=>!r.deviceId).map(r=>`<option value="${r.id}">Bus ${r.id} - ${r.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Firmware Version</label>
            <input type="text" name="fwVersion" class="form-control" value="v1.4.2" required>
          </div>
          <div class="form-group">
            <label class="form-label">Initial Status</label>
            <select name="status" class="form-control">
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </form>
    `,i=L.show({title:"Provision New ESP32 Sensor Node",bodyHtml:a,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-device">Cancel</button>
      <button class="btn btn-primary" id="btn-save-device">Save IoT node</button>
    `});(n=document.getElementById("btn-cancel-device"))==null||n.addEventListener("click",()=>i.close()),(o=document.getElementById("btn-save-device"))==null||o.addEventListener("click",()=>{const r=document.getElementById("form-add-device");if(!r.checkValidity()){r.reportValidity();return}const l=new FormData(r),c=l.get("id"),p=l.get("busId"),u={id:c,busId:p||"",status:l.get("status"),lastComm:"Just now",fwVersion:l.get("fwVersion"),rssi:"-62 dBm",heap:"182 KB",temperature:"40.5 °C"};d.addDevice(u),p&&d.updateBus(p,{deviceId:c}),y.show("IoT Node Provisioned","success",`Device ${c} registered.`),i.close(),this.updateTable()})},openEditDeviceModal(t){var r,l;const e=d.getDevices().find(c=>c.id===t);if(!e)return;const s='<option value="">Unassigned</option>'+d.getBuses().filter(c=>!c.deviceId||c.id===e.busId).map(c=>`<option value="${c.id}" ${c.id===e.busId?"selected":""}>Bus ${c.id} - ${c.name}</option>`).join(""),i=`
      <form id="form-edit-device">
        <div class="form-group">
          <label class="form-label">Device MAC ID</label>
          <input type="text" name="id" class="form-control" value="${e.id}" disabled>
        </div>
        <div class="form-group">
          <label class="form-label">Linked Bus Vehicle</label>
          <select name="busId" class="form-control">
            ${s}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Firmware Version</label>
            <input type="text" name="fwVersion" class="form-control" value="${e.fwVersion}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Node Status</label>
            <select name="status" class="form-control">
              <option value="Online" ${e.status==="Online"?"selected":""}>Online</option>
              <option value="Offline" ${e.status==="Offline"?"selected":""}>Offline</option>
              <option value="Maintenance" ${e.status==="Maintenance"?"selected":""}>Maintenance</option>
              <option value="Fault" ${e.status==="Fault"?"selected":""}>Fault</option>
            </select>
          </div>
        </div>
      </form>
    `,o=L.show({title:`Configure IoT Node: ${e.id}`,bodyHtml:i,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-device">Cancel</button>
      <button class="btn btn-primary" id="btn-save-device">Save Changes</button>
    `});(r=document.getElementById("btn-cancel-device"))==null||r.addEventListener("click",()=>o.close()),(l=document.getElementById("btn-save-device"))==null||l.addEventListener("click",()=>{const c=document.getElementById("form-edit-device");if(!c.checkValidity()){c.reportValidity();return}const p=new FormData(c),u=e.busId,g=p.get("busId")||"",f={busId:g,status:p.get("status"),fwVersion:p.get("fwVersion")};u!==g&&(u&&d.updateBus(u,{deviceId:""}),g&&d.updateBus(g,{deviceId:e.id})),d.updateDevice(e.id,f),y.show("IoT Node Saved","success",`Configuration updated for ESP32 ${e.id}`),o.close(),this.updateTable()})},deleteDevice(t){if(confirm(`Are you sure you want to de-register and delete ESP32 Node ${t}?`)){const e=d.getDevices().find(a=>a.id===t);e&&e.busId&&d.updateBus(e.busId,{deviceId:""}),d.deleteDevice(t),y.show("Device Removed","danger",`IoT node ${t} removed.`),this.updateTable()}}};let F=[];const Ae={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Fleet Analytics & Intelligence</h1>
            <p class="page-subtitle">Historical occupancy curves, route load performance, and demand forecasting.</p>
          </div>
          <div class="flex items-center gap-2">
            <!-- Date range picker -->
            <input type="date" id="date-from" class="filter-select" value="2026-06-01" style="padding: 6px 10px;">
            <span class="text-muted text-sm">to</span>
            <input type="date" id="date-to" class="filter-select" value="2026-06-17" style="padding: 6px 10px;">
            
            <button class="btn btn-secondary btn-sm" id="btn-export-csv">
              <span class="material-symbols-outlined">description</span>Export CSV
            </button>
            <button class="btn btn-primary btn-sm" id="btn-export-pdf">
              <span class="material-symbols-outlined">picture_as_pdf</span>Export PDF Report
            </button>
          </div>
        </div>
      </div>

      <!-- Stat breakdown row -->
      <div class="stats-grid fade-in fade-in-delay-1">
        <div class="stat-card accent-primary" style="padding:16px;">
          <div class="stat-label" style="font-size:10px">Total Passenger Trips (This Month)</div>
          <div class="stat-value" style="font-size:24px">54,230</div>
          <div class="stat-trend up" style="font-size:11px"><span class="material-symbols-outlined text-sm">trending_up</span>+12% vs May</div>
        </div>
        <div class="stat-card accent-success" style="padding:16px;">
          <div class="stat-label" style="font-size:10px">Fleet Capacity Utilization</div>
          <div class="stat-value" style="font-size:24px">64.5%</div>
          <div class="stat-trend up" style="font-size:11px"><span class="material-symbols-outlined text-sm">check_circle</span>Optimal Range</div>
        </div>
        <div class="stat-card accent-warning" style="padding:16px;">
          <div class="stat-label" style="font-size:10px">Peak Hours Congestion Rate</div>
          <div class="stat-value" style="font-size:24px">88.2%</div>
          <div class="stat-trend down" style="font-size:11px"><span class="material-symbols-outlined text-sm">warning</span>Critical loads detected</div>
        </div>
      </div>

      <!-- Charts grid columns -->
      <div class="analytics-grid fade-in fade-in-delay-2">
        <!-- Route Utilization performance bar -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">bar_chart</span>Daily Passenger Volume by Route</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap-lg">
              <canvas id="route-perf-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Hourly Peak Analysis line -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">timeline</span>Peak Demand hours (24h clock)</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap-lg">
              <canvas id="peak-hours-chart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom charts: Device health distribution & Load categories -->
      <div class="grid-2 fade-in fade-in-delay-3">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">pie_chart</span>Commuter Density categories</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap">
              <canvas id="density-pie-chart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">stacked_bar_chart</span>Monthly Commuter Growth</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap">
              <canvas id="monthly-commuter-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `},mount(){var t,e;this.initCharts(),(t=document.getElementById("btn-export-csv"))==null||t.addEventListener("click",()=>{this.triggerMockExport("CSV")}),(e=document.getElementById("btn-export-pdf"))==null||e.addEventListener("click",()=>{this.triggerMockExport("PDF")})},unmount(){F.forEach(t=>t.destroy()),F=[]},initCharts(){var i,n,o,r;const t=(i=document.getElementById("route-perf-chart"))==null?void 0:i.getContext("2d");if(t){const l=new Chart(t,{type:"bar",data:{labels:["Route 19B","Route M70","Route 47A","Route 23C","Route 102"],datasets:[{label:"Average Daily Commuters",data:[2400,3100,1250,1800,1500],backgroundColor:["#0057B8","#00A8E8","#22C55E","#F59E0B","#737686"],borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1}},y:{grid:{color:"rgba(0,0,0,0.05)"}}}}});F.push(l)}const e=(n=document.getElementById("peak-hours-chart"))==null?void 0:n.getContext("2d");if(e){const l=new Chart(e,{type:"line",data:{labels:["06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"],datasets:[{label:"Load utilization (%)",data:[42,91,75,48,40,62,94,70,35],borderColor:"#EF4444",backgroundColor:"rgba(239, 68, 68, 0.05)",borderWidth:3,fill:!0,tension:.3,pointRadius:4,pointBackgroundColor:"#EF4444"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1}},y:{grid:{color:"rgba(0,0,0,0.05)"},min:0,max:100}}}});F.push(l)}const a=(o=document.getElementById("density-pie-chart"))==null?void 0:o.getContext("2d");if(a){const l=new Chart(a,{type:"pie",data:{labels:["Low Crowd (<40%)","Medium Crowd (40-75%)","High Crowd (>75%)"],datasets:[{data:[45,35,20],backgroundColor:["#22C55E","#F59E0B","#EF4444"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{boxWidth:15,font:{family:"Inter"}}}}}});F.push(l)}const s=(r=document.getElementById("monthly-commuter-chart"))==null?void 0:r.getContext("2d");if(s){const l=new Chart(s,{type:"bar",data:{labels:["Jan","Feb","Mar","Apr","May","Jun"],datasets:[{label:"Total Commuters",data:[34e3,38e3,42e3,47e3,5e4,54230],backgroundColor:"#0057B8",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1}},y:{grid:{color:"rgba(0,0,0,0.05)"}}}}});F.push(l)}},triggerMockExport(t){var s,i;const e=(s=document.getElementById("date-from"))==null?void 0:s.value,a=(i=document.getElementById("date-to"))==null?void 0:i.value;y.show(`Generating ${t} file...`,"info",`Compiling data logs: ${e} to ${a}`),setTimeout(()=>{const n=document.createElement("a"),o=`CrowdSense TN Transit Analytics Summary
Generated: ${new Date().toLocaleString()}
Date Range: ${e} to ${a}
Total Trips: 54,230
Fleet utilization: 64.5%
Peak Hours load: 88.2%`;n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(o)),n.setAttribute("download",`crowdsense_report_${e}_to_${a}.${t.toLowerCase()==="pdf"?"pdf":"csv"}`),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),y.show("Report Downloaded","success",`Saved as crowdsense_report_${e}_to_${a}.${t.toLowerCase()}`)},2e3)}};let K=null,U="All",R="All";const Ee={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Notification & Alerts Center</h1>
            <p class="page-subtitle">Acknowledge critical incident reports, hardware offline alerts, and passenger overloads.</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-secondary" id="btn-mark-all-read">
              <span class="material-symbols-outlined">done_all</span>Mark All Acknowledged
            </button>
          </div>
        </div>
      </div>

      <!-- Filters Row -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px; display:flex; justify-content:between; align-items:center; flex-wrap:wrap; gap:12px;">
          <!-- Tabs -->
          <div class="notif-filter-tabs" style="margin-bottom:0;">
            <button class="notif-tab ${U==="All"?"active":""}" data-tab="All">All Logs</button>
            <button class="notif-tab ${U==="Unread"?"active":""}" data-tab="Unread">Active/Unread</button>
            <button class="notif-tab ${U==="Read"?"active":""}" data-tab="Read">Archived/Read</button>
          </div>

          <!-- Priority Select -->
          <select id="filter-notif-priority" class="filter-select">
            <option value="All" ${R==="All"?"selected":""}>All Priorities</option>
            <option value="Critical" ${R==="Critical"?"selected":""}>Critical Only</option>
            <option value="High" ${R==="High"?"selected":""}>High</option>
            <option value="Medium" ${R==="Medium"?"selected":""}>Medium</option>
            <option value="Low" ${R==="Low"?"selected":""}>Low</option>
          </select>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="card fade-in fade-in-delay-2">
        <div class="card-body-flush" id="alerts-hub-container">
          <!-- populated dynamically -->
        </div>
      </div>
    `},mount(){var t,e;K=a=>{this.renderAlerts(a)},d.subscribe("notifications",K),document.querySelectorAll(".notif-tab").forEach(a=>{a.addEventListener("click",()=>{var s;(s=document.querySelector(".notif-tab.active"))==null||s.classList.remove("active"),a.classList.add("active"),U=a.getAttribute("data-tab"),this.updateAlertsList()})}),(t=document.getElementById("filter-notif-priority"))==null||t.addEventListener("change",a=>{R=a.target.value,this.updateAlertsList()}),(e=document.getElementById("btn-mark-all-read"))==null||e.addEventListener("click",()=>{d.markAllAlertsAsRead(),y.show("All Notifications Read","success","Incident logs acknowledged"),this.updateAlertsList()})},unmount(){K&&(d.unsubscribe("notifications",K),K=null)},updateAlertsList(){const t={alerts:d.getAlerts()};this.renderAlerts(t)},renderAlerts(t){const e=document.getElementById("alerts-hub-container");if(!e)return;let a=t.alerts;if(U==="Unread"?a=a.filter(s=>s.status==="Unread"):U==="Read"&&(a=a.filter(s=>s.status==="Read")),R!=="All"&&(a=a.filter(s=>s.priority===R)),a.length===0){e.innerHTML=`
        <div class="text-muted" style="text-align:center; padding: 40px;">
          No incident alerts matches selection criteria.
        </div>
      `;return}e.innerHTML=a.map(s=>{const i=s.priority.toLowerCase(),n=s.status==="Unread"?'<span class="alert-dot unread"></span>':'<span class="alert-dot read"></span>',o=s.status==="Unread"?`<button class="btn btn-secondary btn-sm ack-alert" data-alert-id="${s.id}">Acknowledge</button>`:`<button class="btn btn-ghost btn-sm del-alert" style="color:var(--color-danger)" data-alert-id="${s.id}">Archive</button>`;return`
        <div class="alert-item">
          ${n}
          <div class="alert-icon-wrap ${i}">
            <span class="material-symbols-outlined">${s.priority==="Critical"?"gpp_maybe":"warning"}</span>
          </div>
          <div class="alert-content">
            <div class="alert-title">${s.title} <span class="badge ${this.getBadgeClass(s.priority)}" style="font-size:8px; padding:1px 4px; margin-left:6px">${s.priority}</span></div>
            <div class="alert-desc">${s.desc}</div>
          </div>
          <div class="flex items-center gap-3">
            <div class="alert-meta">
              <div>${s.time}</div>
              <div style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">Target: ${s.busId||"System"}</div>
            </div>
            ${o}
          </div>
        </div>
      `}).join(""),e.querySelectorAll(".ack-alert").forEach(s=>{s.addEventListener("click",()=>{const i=s.getAttribute("data-alert-id");d.markAlertAsRead(i),y.show("Alert Acknowledged","success","Incident marked as read."),this.updateAlertsList()})}),e.querySelectorAll(".del-alert").forEach(s=>{s.addEventListener("click",()=>{const i=s.getAttribute("data-alert-id");d.archiveAlert(i),y.show("Alert Archived","info","Log entry deleted."),this.updateAlertsList()})})},getBadgeClass(t){return t==="Critical"?"badge-danger":t==="High"?"badge-warning":t==="Medium"?"badge-secondary":"badge-neutral"}};let G=null;const Ie={render(){return`
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Administrative Access Management</h1>
            <p class="page-subtitle">Assign transit roles, manage staff permission tiers, and create operator accounts.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-user">
            <span class="material-symbols-outlined">person_add</span>Register Staff Profile
          </button>
        </div>
      </div>

      <!-- Users Grid -->
      <div class="grid-3 fade-in fade-in-delay-1" id="users-grid-container">
        <!-- populated dynamically -->
      </div>
    `},mount(){var t;G=e=>{this.renderUsers(e)},d.subscribe("users",G),(t=document.getElementById("btn-add-user"))==null||t.addEventListener("click",()=>{this.openAddUserModal()})},unmount(){G&&(d.unsubscribe("users",G),G=null)},updateUsers(){const t={users:d.getUsers()};this.renderUsers(t)},renderUsers(t){const e=document.getElementById("users-grid-container");if(!e)return;const a=t.users;if(a.length===0){e.innerHTML=`
        <div class="card" style="grid-column: span 3; padding: 40px; text-align:center;">
          <p class="text-muted">No administrative users found.</p>
        </div>
      `;return}e.innerHTML=a.map(s=>{const i=s.name.split(" ").map(o=>o[0]).join("").toUpperCase();let n="badge-neutral";return s.role==="Super Admin"?n="badge-danger":s.role==="Transport Officer"?n="badge-primary":s.role==="Route Manager"?n="badge-secondary":s.role==="Operations Manager"&&(n="badge-warning"),`
        <div class="card flex flex-col justify-between" style="padding: 20px; text-align:center; position:relative;">
          <!-- Top corners controls -->
          <div style="position:absolute; top:10px; right:10px;" class="td-actions">
            <button class="btn-icon edit-user" data-user-id="${s.id}" title="Edit Profile"><span class="material-symbols-outlined" style="font-size:16px;">edit</span></button>
            <button class="btn-icon delete-user" style="color:var(--color-danger)" data-user-id="${s.id}" title="Delete User"><span class="material-symbols-outlined" style="font-size:16px;">delete</span></button>
          </div>

          <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:12px;">
            <div class="admin-avatar" style="width:56px; height:56px; font-size:18px; font-weight:700; margin-bottom:12px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">${i}</div>
            <h3 class="font-bold text-base" style="color:var(--color-text-primary);">${s.name}</h3>
            <p class="text-muted text-sm" style="margin-bottom:8px;">${s.email}</p>
            <span class="badge ${n}">${s.role}</span>
          </div>

          <div style="border-top:1px solid var(--color-border-subtle); padding-top:10px; margin-top:8px; display:flex; justify-content:between; align-items:center;">
            <span class="text-sm text-muted">Status:</span>
            <span class="badge badge-success">Active</span>
          </div>
        </div>
      `}).join(""),e.querySelectorAll(".edit-user").forEach(s=>{s.addEventListener("click",()=>this.openEditUserModal(s.getAttribute("data-user-id")))}),e.querySelectorAll(".delete-user").forEach(s=>{s.addEventListener("click",()=>this.deleteUser(s.getAttribute("data-user-id")))})},openAddUserModal(){var s,i;const a=L.show({title:"Register Administrative Staff Profile",bodyHtml:`
      <form id="form-add-user">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" name="name" class="form-control" placeholder="e.g. S. Ramesh Kumar" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" placeholder="e.g. ramesh.k@crowdsense.tn.gov" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Administrative Role</label>
            <select name="role" class="form-control">
              <option value="Super Admin">Super Admin</option>
              <option value="Transport Officer">Transport Officer</option>
              <option value="Route Manager">Route Manager</option>
              <option value="Operations Manager">Operations Manager</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Permission Access Level</label>
            <select name="access" class="form-control">
              <option value="read_write">Full Access (Read/Write)</option>
              <option value="read_only">Audit Access (Read-Only)</option>
            </select>
          </div>
        </div>
      </form>
    `,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-user">Cancel</button>
      <button class="btn btn-primary" id="btn-save-user">Create Account</button>
    `});(s=document.getElementById("btn-cancel-user"))==null||s.addEventListener("click",()=>a.close()),(i=document.getElementById("btn-save-user"))==null||i.addEventListener("click",()=>{const n=document.getElementById("form-add-user");if(!n.checkValidity()){n.reportValidity();return}const o=new FormData(n),r={name:o.get("name"),email:o.get("email"),role:o.get("role"),accessLevel:o.get("access")};d.addUser(r),y.show("Staff Profile Created","success",`Account for ${r.name} registered.`),a.close(),this.updateUsers()})},openEditUserModal(t){var n,o;const e=d.getUsers().find(r=>r.id===t);if(!e)return;const a=`
      <form id="form-edit-user">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" name="name" class="form-control" value="${e.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" value="${e.email}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Administrative Role</label>
            <select name="role" class="form-control">
              <option value="Super Admin" ${e.role==="Super Admin"?"selected":""}>Super Admin</option>
              <option value="Transport Officer" ${e.role==="Transport Officer"?"selected":""}>Transport Officer</option>
              <option value="Route Manager" ${e.role==="Route Manager"?"selected":""}>Route Manager</option>
              <option value="Operations Manager" ${e.role==="Operations Manager"?"selected":""}>Operations Manager</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Permission Access Level</label>
            <select name="access" class="form-control">
              <option value="read_write" ${e.accessLevel==="read_write"?"selected":""}>Full Access (Read/Write)</option>
              <option value="read_only" ${e.accessLevel==="read_only"?"selected":""}>Audit Access (Read-Only)</option>
            </select>
          </div>
        </div>
      </form>
    `,i=L.show({title:`Edit Staff Account: ${e.name}`,bodyHtml:a,footerHtml:`
      <button class="btn btn-ghost" id="btn-cancel-user">Cancel</button>
      <button class="btn btn-primary" id="btn-save-user">Save Changes</button>
    `});(n=document.getElementById("btn-cancel-user"))==null||n.addEventListener("click",()=>i.close()),(o=document.getElementById("btn-save-user"))==null||o.addEventListener("click",()=>{const r=document.getElementById("form-edit-user");if(!r.checkValidity()){r.reportValidity();return}const l=new FormData(r),c={name:l.get("name"),email:l.get("email"),role:l.get("role"),accessLevel:l.get("access")};d.updateUser(e.id,c),y.show("Staff Profile Updated","success",`Changes saved for ${c.name}`),i.close(),this.updateUsers()})},deleteUser(t){const e=d.getUsers().find(a=>a.id===t);e&&confirm(`Are you sure you want to delete access account for staff ${e.name}?`)&&(d.deleteUser(t),y.show("Staff Profile Removed","danger",`${e.name} removed from admin access.`),this.updateUsers())}},$e={render(){const t=d.getSettings();return`
      <div class="page-header fade-in">
        <h1 class="page-title">System & Operational Settings</h1>
        <p class="page-subtitle">Configure thresholds limits, IoT connection intervals, and notification dispatch rules.</p>
      </div>

      <div class="grid-2 fade-in fade-in-delay-1" style="grid-template-columns: 2fr 1fr; gap: 20px;">
        
        <!-- Main Settings Controls -->
        <div class="flex flex-col gap-4">
          <!-- Threshold settings -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <span class="material-symbols-outlined">analytics</span>Occupancy Load Thresholds
              </div>
            </div>
            <div class="card-body">
              <div class="settings-section">
                <div class="settings-row">
                  <div>
                    <div class="settings-label">High Occupancy Limit (%)</div>
                    <div class="settings-desc">Triggers medium crowd indicator & warning logs. Default: 75%</div>
                  </div>
                  <input type="number" id="setting-high-occ" class="filter-select" style="width: 80px;" value="${t.highOccupancyThreshold}" min="40" max="85">
                </div>
                
                <div class="settings-row">
                  <div>
                    <div class="settings-label">Critical Load Overload (%)</div>
                    <div class="settings-desc">Triggers Red warning indicator & operator SMS. Default: 90%</div>
                  </div>
                  <input type="number" id="setting-critical-occ" class="filter-select" style="width: 80px;" value="${t.criticalOccupancyThreshold}" min="80" max="100">
                </div>
              </div>
            </div>
          </div>

          <!-- Telemetry configuration -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <span class="material-symbols-outlined">memory</span>IoT ESP32 Node Timers
              </div>
            </div>
            <div class="card-body">
              <div class="settings-section">
                <div class="settings-row">
                  <div>
                    <div class="settings-label">GPS Polling Rate (seconds)</div>
                    <div class="settings-desc">Controls frequency of coordinates update transmissions. Default: 3s</div>
                  </div>
                  <input type="number" id="setting-gps-poll" class="filter-select" style="width: 80px;" value="${t.gpsPollingInterval}" min="1" max="30">
                </div>
                
                <div class="settings-row">
                  <div>
                    <div class="settings-label">Heartbeat Timeout Limit (seconds)</div>
                    <div class="settings-desc">Time duration before declaring node offline. Default: 60s</div>
                  </div>
                  <input type="number" id="setting-timeout-limit" class="filter-select" style="width: 80px;" value="${t.offlineTimeout}" min="10" max="300">
                </div>
              </div>
            </div>
          </div>

          <!-- Dispatch rules toggles -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <span class="material-symbols-outlined">notifications</span>Alert Dispatch Channels
              </div>
            </div>
            <div class="card-body">
              <div class="settings-section">
                <div class="settings-row">
                  <div>
                    <div class="settings-label">Send Email Alerts</div>
                    <div class="settings-desc">Dispatch daily transit summary logs to transport superintendents.</div>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" id="setting-email-notif" ${t.alertEmailNotif?"checked":""}>
                    <span class="toggle-track"></span>
                  </label>
                </div>

                <div class="settings-row">
                  <div>
                    <div class="settings-label">Send SMS Alerts (Critical Load)</div>
                    <div class="settings-desc">Dispatch cellular SMS message to assigned depot driver when occupancy is exceeded.</div>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" id="setting-sms-notif" ${t.alertSmsNotif?"checked":""}>
                    <span class="toggle-track"></span>
                  </label>
                </div>

                <div class="settings-row">
                  <div>
                    <div class="settings-label">Browser Push Notifications</div>
                    <div class="settings-desc">Enable desktop toast notifications for system warnings.</div>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" id="setting-push-notif" ${t.alertPushNotif?"checked":""}>
                    <span class="toggle-track"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 justify-end" style="margin-top:8px;">
            <button class="btn btn-ghost" id="btn-reset-settings">Restore Defaults</button>
            <button class="btn btn-primary" id="btn-save-settings">Save System Settings</button>
          </div>
        </div>

        <!-- Sidebar helper info -->
        <div class="flex flex-col gap-4">
          <div class="card">
            <div class="card-header">
              <div class="card-title"><span class="material-symbols-outlined">info</span>Platform Info</div>
            </div>
            <div class="card-body" style="font-size:12px; line-height:1.6;">
              <div style="margin-bottom:8px;"><b>System ID:</b> CROWDSENSE-TN-PROD-01</div>
              <div style="margin-bottom:8px;"><b>Region code:</b> TN-01 (Chennai Area)</div>
              <div style="margin-bottom:8px;"><b>Database Schema:</b> PostgreSQL v15.4 Ready</div>
              <div style="margin-bottom:8px;"><b>Firmware Compatibility:</b> ESP32-WROOM-32E</div>
              <div style="margin-bottom:8px;"><b>API server gateway:</b> <code>https://api.crowdsense.tn.gov/v1/</code></div>
              <div style="border-top:1px solid var(--color-border-subtle); padding-top:10px; margin-top:10px;">
                <span style="font-weight:600; color:var(--color-primary);">Need Technical Help?</span>
                <p class="text-muted mt-1" style="font-size:11px">Contact smart city support hub at: <code>support@crowdsense.tn.gov</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `},mount(){var t,e;(t=document.getElementById("btn-save-settings"))==null||t.addEventListener("click",()=>{const a={highOccupancyThreshold:parseInt(document.getElementById("setting-high-occ").value),criticalOccupancyThreshold:parseInt(document.getElementById("setting-critical-occ").value),gpsPollingInterval:parseInt(document.getElementById("setting-gps-poll").value),offlineTimeout:parseInt(document.getElementById("setting-timeout-limit").value),alertEmailNotif:document.getElementById("setting-email-notif").checked,alertSmsNotif:document.getElementById("setting-sms-notif").checked,alertPushNotif:document.getElementById("setting-push-notif").checked,autoRefreshDashboard:!0};d.saveSettings(a),d.addActivity("Configuration Modified","System parameters and alert thresholds modified."),y.show("Settings Saved","success","Configuration limits updated successfully.")}),(e=document.getElementById("btn-reset-settings"))==null||e.addEventListener("click",()=>{if(confirm("Reset settings back to defaults?")){const a={highOccupancyThreshold:75,criticalOccupancyThreshold:90,gpsPollingInterval:3,offlineTimeout:60,alertEmailNotif:!0,alertSmsNotif:!1,alertPushNotif:!0,autoRefreshDashboard:!0};d.saveSettings(a),y.show("Defaults Restored","info","Threshold limits reset."),window.location.reload()}})}},Le={"/loading":ve,"/dashboard":be,"/operations":he,"/buses":xe,"/routes":we,"/devices":Se,"/analytics":Ae,"/notifications":Ee,"/users":Ie,"/settings":$e};let Z=null;function Ce(){d.init(),window.addEventListener("hashchange",se);const t=window.location.hash;t&&t!=="#/loading"&&sessionStorage.setItem("redirect_target",t),window.location.hash="#/loading",se(),ke(),d.subscribe("shell-badges",e=>{Be(e)})}function se(){const e=window.location.hash.split("?")[0].substring(1)||"/dashboard",a=Le[e];if(!a){window.location.hash="#/dashboard";return}e==="/loading"?document.body.classList.add("loading-screen-active"):document.body.classList.remove("loading-screen-active"),Z&&Z.unmount&&Z.unmount(),Te(e);const s=document.getElementById("page-content");s&&(s.innerHTML=a.render(),Z=a,a.mount&&a.mount());const i=document.getElementById("breadcrumb-page");if(i){const n=e.substring(1).charAt(0).toUpperCase()+e.substring(2);i.textContent=n==="Operations"?"Operations Center":n}ae()}function Te(t){const e=t.substring(1);document.querySelectorAll(".nav-item").forEach(a=>{a.classList.remove("active"),a.getAttribute("data-page")===e&&a.classList.add("active")})}function Be(t){const e=t.alerts.filter(o=>o.status==="Unread").length,a=t.devices.filter(o=>o.status==="Fault"||o.status==="Offline").length,s=document.getElementById("badge-notifications");s&&(s.textContent=e,s.style.display=e>0?"block":"none");const i=document.getElementById("topbar-noti-count");i&&(i.textContent=e,i.style.display=e>0?"flex":"none");const n=document.getElementById("badge-devices");n&&(n.textContent=a,n.style.display=a>0?"block":"none")}function ke(){var i,n;const t=document.getElementById("sidebar"),e=document.getElementById("sidebar-toggle");e==null||e.addEventListener("click",()=>{t==null||t.classList.toggle("collapsed")});const a=document.getElementById("mobile-menu-btn"),s=document.getElementById("sidebar-backdrop");a==null||a.addEventListener("click",()=>{t==null||t.classList.add("mobile-open"),s==null||s.classList.remove("hidden")}),s==null||s.addEventListener("click",ae),(i=document.getElementById("btn-logout"))==null||i.addEventListener("click",()=>{confirm("Confirm Logout from CrowdSense TN Admin?")&&(y.show("Logged Out","info","You have securely signed out."),setTimeout(()=>{alert("Admin Session Ended securely.")},1e3))}),setInterval(()=>{const o=document.getElementById("topbar-clock");o&&(o.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}))},1e3),(n=document.getElementById("topbar-noti-btn"))==null||n.addEventListener("click",()=>{window.location.hash="#/notifications"})}function ae(){const t=document.getElementById("sidebar"),e=document.getElementById("sidebar-backdrop");t==null||t.classList.remove("mobile-open"),e==null||e.classList.add("hidden")}window.addEventListener("DOMContentLoaded",Ce);
