package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Brand;
import com.mycompany.myapp.repository.BrandRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Brand}.
 */
@Service
@Transactional
public class BrandService {

    private final Logger log = LoggerFactory.getLogger(BrandService.class);

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    /**
     * Save a brand.
     *
     * @param brand the entity to save.
     * @return the persisted entity.
     */
    public Brand save(Brand brand) {
        log.debug("Request to save Brand : {}", brand);
        return brandRepository.save(brand);
    }

    /**
     * Partially update a brand.
     *
     * @param brand the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Brand> partialUpdate(Brand brand) {
        log.debug("Request to partially update Brand : {}", brand);

        return brandRepository
            .findById(brand.getId())
            .map(
                existingBrand -> {
                    if (brand.getName() != null) {
                        existingBrand.setName(brand.getName());
                    }
                    if (brand.getLabel() != null) {
                        existingBrand.setLabel(brand.getLabel());
                    }

                    return existingBrand;
                }
            )
            .map(brandRepository::save);
    }

    /**
     * Get all the brands.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Brand> findAll(Pageable pageable) {
        log.debug("Request to get all Brands");
        return brandRepository.findAll(pageable);
    }

    /**
     * Get one brand by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Brand> findOne(Long id) {
        log.debug("Request to get Brand : {}", id);
        return brandRepository.findById(id);
    }

    /**
     * Delete the brand by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Brand : {}", id);
        brandRepository.deleteById(id);
    }
}
