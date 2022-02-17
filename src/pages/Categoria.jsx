import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import {
  useParams,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { busca } from "../api/api";
import "../assets/css/blog.css";
import ListaCategorias from "../components/ListaCategorias";
import ListaPost from "../components/ListaPost";
import SubCategoria from "./SubCategoria";

export default function Categoria() {
  const { id } = useParams();
  const { url, path } = useRouteMatch();
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    busca(`/categorias/${id}`, (categoria) => {
      setSubcategorias(categoria.subcategorias);
    });
  }, [id]);

  return (
    <>
      <div className="container">
        <h2 className="titulo-pagina">Pet notícias</h2>
      </div>

      <ListaCategorias />
      <ul className="lista-categorias container flex">
        {subcategorias.map((subcategoria) => {
          return (
            <li
              className={`lista-categorias__categoria lista-categorias__categoria--${id}`}
              key={subcategoria}
            >
              <Link to={`${url}/${subcategoria}`}>{subcategoria}</Link>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route exact path={`${path}/`}>
          <ListaPost url={`/posts?categoria=${id}`} />
        </Route>
        <Route exact path={`${path}/:subcategsoria`}>
          <SubCategoria />
        </Route>
      </Switch>
    </>
  );
}
