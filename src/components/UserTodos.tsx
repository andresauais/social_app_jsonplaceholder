import { useTodos } from '../hooks/useTodos';

interface UserTodosProps {
  userId: number;
}

const UserTodos = ({ userId }: UserTodosProps) => {
  const {
    todos,
    isLoading,
    newTodo,
    setNewTodo,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
  } = useTodos(userId);

  if (isLoading) return <div>Cargando TODOs...</div>;

  return (
    <div className="mt-5">
      <h3>TODOs del usuario</h3>

      <ul className="list-group">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.completed ? 'list-group-item-success' : ''
            }`}
          >
            <span>{todo.title}</span>
            <div>
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => handleToggleTodo(todo.id, todo.completed)}
              >
                {todo.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="input-group mt-3 mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Añadir nuevo TODO"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Añadir
        </button>
      </div>
    </div>
  );
};

export default UserTodos;
