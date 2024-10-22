import Link from 'next/link';
import { FaGithub as GitHub } from 'react-icons/fa'; 

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Nosso Repositório</h2>
        <p className="mb-2">Confira nosso código-fonte e contribuições no GitHub:</p>
      
        <div className="flex justify-center items-center mb-4">
          <Link href="https://github.com/aaaaaaa.com" target="_blank">
            <GitHub className="text-3xl hover:text-blue-400 transition duration-300" /> 
          </Link>
        </div>

        <div className="mt-4">
          <p className="text-sm">© 2024 Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};