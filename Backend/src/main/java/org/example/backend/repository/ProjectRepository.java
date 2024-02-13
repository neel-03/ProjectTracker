package org.example.backend.repository;

import org.example.backend.Entities.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    // We are not using interface's findById method (because return type is Optional: NullPointerException chance)
    Project findById(long id);
}
