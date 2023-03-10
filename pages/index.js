import Card from '@/components/Card'
import Header from '@/components/Header'
import Title from '@/components/Title'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <>
    <Sidebar>
      <Header/>
      <Title
        title={'dashboard'}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          title={'tugas selesai'}
          count={'230'}
        />
        <Card
          title={'tugas belum'}
          count={'100'}
        />
        <Card
          title={'tugas proses'}
          count={'120'}
        />
      </div>
    </Sidebar>
    </>
  )
}
